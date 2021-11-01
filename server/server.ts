import url from "url"; // for url.parse
import http from 'http'; // for listen
import path from "path"; // for path.extname

import  * as spider from './spider';  // request tool module
import * as Config from '../src/services/config'; // config settings


function onRequest(request:http.IncomingMessage, response: http.ServerResponse) {
  // request
  const pathname = url.parse(request.url!, true).pathname;
  const params = url.parse(request.url!, true).query;
  console.log("Server: ", "Request for " + pathname);

  // process
  switch (pathname) {
    case Config.config.mainAPIKey:
      mainAPIProcess(params, response);
      break;
    case Config.config.imageAPIKey:
      imageAPIProcess(params, response);
      break;
    case Config.config.proxyAPIKey:
      proxyAPIProcess(params, response);
      break;
    default:
      defaultProcess(response);
      break;
  }
}

function proxyAPIProcess(paramConfig : any, res: http.ServerResponse) {
  const url = paramConfig.url;
  spider.loadUrl(url, (response:any, data:any) => {

    if (data === undefined) {
      console.log("Error on paramConfig");
    } else {
      res.writeHead(200, {
        "Content-Length": data.length,
        "Content-Type": response.headers['content-type'],
        "Access-Control-Allow-Origin": "*"
      });
      res.end(data, "binary");
    }
  });
}

function getMimeType(pathname:string) {
  var validExtensions: Record<string, string> = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".jpg": "image/jpeg",
    ".gif": "image/gif",
    ".png": "image/png"
  };
  var ext = path.extname(pathname);
  var type = validExtensions[ext];
  return type;
}

// load image
function imageAPIProcess(paramConfig : any, res: http.ServerResponse) {
  const imagePath = Config.imagePath(paramConfig.foldername, paramConfig.filename);
  const mimeType = getMimeType(imagePath);
  spider.readImage(imagePath, (data:any) => {
    res.writeHead(200, {
      "Content-Length": data.length,
      "Content-Type": mimeType,
      "Access-Control-Allow-Origin": "*"
    });
    res.end(data);
  }, () => {
    res.writeHead(500);
    res.end();
  });
}

// load or download image
function mainAPIProcess(paramConfig: any, res: http.ServerResponse) {
  const imagePath = Config.imagePath(paramConfig.foldername, paramConfig.filename);
  const mimeType = getMimeType(imagePath);
  spider.readImage(imagePath, (data:any) => {
    res.writeHead(200, {
      "Content-Length": data.length,
      "Content-Type": mimeType,
      "Access-Control-Allow-Origin": "*"
    });
    res.end(data);
    console.log("Server: ", "Load From Cache" + "file path = " + imagePath);
  }, () => {
    spider.downloadImage(paramConfig.url, imagePath, () => {
      // response
      res.writeHead(200, {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*"
      });
      res.write(imagePath);
      console.log("Server: ", "Download Finish" + "file path = " + imagePath);
      res.end();
    });
  });
}

function defaultProcess(res: http.ServerResponse) {
  res.writeHead(500);
  res.end();
}

function serve(port:number) {
  // spider.downloadImage(url, filename, () => {console.log("finish");});
  http.createServer(onRequest).listen(port);
  console.log('Server: running at http://127.0.0.1:' + port);
}

export { serve }
