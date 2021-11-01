import path from 'path'
import fs from 'fs'
import request from 'request'

const downloadImage = (url: string, path: string, callback: Function) => {
  ensureDirectoryExistence(path);
  request.get(url)
    .on('error', (err) => { console.log(err) })
    .pipe(
      fs.createWriteStream(path, 'binary')
        .on('close', () => {
          readImage(path, callback, (err:Error) => {
            console.log(err);
            downloadImage(url, path, callback);
          })
        }
        )
    );
}

const loadUrl = (url: string, callback: Function) => {
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


const readImage = (path: string, then: Function, error: Function) => {
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

const ensureDirectoryExistence = (filePath: string) => {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}


export {
  downloadImage,
  readImage,
  loadUrl,
}
