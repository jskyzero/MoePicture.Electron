const fs = require('fs');
const path = require('path')
const request = require('request');

const downloadImage = (url, path, callback) => {
  ensureDirectoryExistence(path);
  request.get(url).pipe(fs.createWriteStream(path, 'binary').on('close', callback));
}

const ensureDirectoryExistence = (filePath) => {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

module.exports = { spider: { downloadImage: downloadImage } }
