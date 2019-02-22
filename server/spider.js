const fs = require('fs');
const path = require('path')
const request = require('request');

const downloadImage = (url, path, callback) => {
  ensureDirectoryExistence(path);
  request.get(url).pipe(fs.createWriteStream(path, 'binary').on('close', callback));
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
    readImage: readImage
  }
}
