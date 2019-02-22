const url = require("url");
const http = require('http');

"use strict"

const { spider } = require('./spider.js')
const pathnameKey = "moepicture"


const onRequest = (request, response) => {
  // request
  const pathname = url.parse(request.url).pathname;
  const params = url.parse(request.url, true).query;

  // process
  const equalKey = pathname == "/" + pathnameKey;
  console.log(equalKey, "Request for " + pathname + " received.");

  if (equalKey) {
    const homedir = require('os').homedir();

    const imagePath = homedir + "/.moepicture" + "/" + params.foldername + "/" + params.filename;
    console.log(params);
    console.log(imagePath);

    spider.downloadImage(params.url, imagePath, () => {
      // response
      response.writeHead(200, {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*"});
      response.write("Hello World");
      response.end();
    });

  }
}


const serve = (port) => {
  // spider.downloadImage(url, filename, () => {console.log("finish");});
  http.createServer(onRequest).listen(port);
  console.log('Server running at http://127.0.0.1:' + port);
};

module.exports = { server: { serve: serve } }
