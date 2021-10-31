const url  = require("url"); // for url.parse
const http = require('http'); // for listen
const path = require("path"); // for path.extname

"use strict"

const { spider } = require('./spider.js');  // request tool module
const { config } = require('../src/config.js'); // config settings

const onRequest = (request, response) => {
  // request
  const pathname = url.parse(request.url, true).pathname;
  const params = url.parse(request.url, true).query;
  console.log("Server: ", "Request for " + pathname);

  // process
  switch(pathname) {
    case config.mainAPIKey:
      mainAPIProcess(config.mainAPIParams(params), response);
      break;
    case config.imageAPIKey:
      imageAPIProcess(config.imageAPIParams(params), response);
      break;
    case config.proxyAPIKey:
      proxyAPIProcess(config.proxyAPIParams(params), response);
      break;
    default:
      defaultProcess(response);
      break;
  }
}

const proxyAPIProcess = (paramConfig, res) => {
  const url = paramConfig.url;
  spider.loadUrl(url, (response, data) => {
    res.writeHead(200, {
      "Content-Length": data.length,
      "Content-Type": response.headers['content-type'],
      "Access-Control-Allow-Origin": "*"});
    res.end(data, "binary");
  })
}

const getMimeType = (pathname) => {
  var validExtensions = {
    ".html" : "text/html",
    ".js"   : "application/javascript",
    ".css"  : "text/css",
    ".jpg"  : "image/jpeg",
    ".gif"  : "image/gif",
    ".png"  : "image/png"  };
  var ext = path.extname(pathname);
  var type = validExtensions[ext];
  return type;
}

// load image
const imageAPIProcess = (paramConfig, res) => {
  const imagePath = config.imagePath(paramConfig.foldername, paramConfig.filename);
  const mimeType = getMimeType(imagePath);
  spider.readImage(imagePath, (data) => {
    res.writeHead(200, {
      "Content-Length": data.length,
      "Content-Type": mimeType,
      "Access-Control-Allow-Origin": "*"});
    res.end(data);
  }, () => {
    res.writeHead(500);
    res.end();
  })
}

// load or download image
const mainAPIProcess = (paramConfig, res) => {
  const imagePath = config.imagePath(paramConfig.foldername, paramConfig.filename);
  const mimeType = getMimeType(imagePath);
  spider.readImage(imagePath, (data) => {
    res.writeHead(200, {
      "Content-Length": data.length,
      "Content-Type": mimeType,
      "Access-Control-Allow-Origin": "*"});
    res.end(data);
    console.log("Server: ", "Load From Cache" + "file path = " + imagePath);
  }, () => {
    spider.downloadImage(paramConfig.url, imagePath, () => {
      // response
      res.writeHead(200, {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*"});
      res.write(imagePath);
      console.log("Server: ", "Download Finish" + "file path = " + imagePath);
      res.end();
    });
  })
}

const defaultProcess = (res) => {
  res.writeHead(500);
  res.end();
}

const serve = (port) => {
  // spider.downloadImage(url, filename, () => {console.log("finish");});
  http.createServer(onRequest).listen(port);
  console.log('Server: running at http://127.0.0.1:' + port);
};

module.exports = { server: { serve: serve } }
