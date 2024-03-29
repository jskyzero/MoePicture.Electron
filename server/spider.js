const fs = require('fs');
const path = require('path')
const request = require('request');

"use strict"

const downloadImage = (url, path, callback) => {
  ensureDirectoryExistence(path);
  request.get(url)
    .on('error', (err) => { console.log(err) })
    .pipe(
      fs.createWriteStream(path, 'binary')
      .on('close', () => {readImage(path, callback, (err) => { downloadImage(url, path, callback);})}
      )
    );
}

const loadUrl = (url, callback) => {
  var requestSettings = {
    method: 'GET',
    url: url,
    encoding: null
};
  request(requestSettings, (error, response, body) => {
    error && console.log(error)
    callback(response, body);
  });
}


const readImage = (path, then, error) => {
  if (fs.existsSync(path)) {
    fs.readFile(path, function (err, data) {
      if (err) {
        error();
      } else {
        then(data);
      }
    });
  } else {
    error();
  }
}

const ensureDirectoryExistence = (filePath) => {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

module.exports = {
  spider: {
    downloadImage: downloadImage,
    readImage: readImage,
    loadUrl: loadUrl,
  }
}
