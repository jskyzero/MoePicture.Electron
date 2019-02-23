const os = require('os');

const config = {
  "port": 25613,
  "ip": "127.0.0.1",
  "configFolder": ".moepicture",
  "mainAPIKey": "/moepicture",
  "imageAPIKey": "/moepicture/img",
  "proxyAPIKey": "/moepicture/proxy",
  "mainAPIUrl": (imgUrl, foldername, filename) => {
    return "http://" + config.ip + ":" + config.port + config.mainAPIKey + "?" +
      "url=" + encodeURIComponent(imgUrl) + "&" +
      "foldername=" + encodeURIComponent(foldername) + "&" +
      "filename=" + encodeURIComponent(filename);
  },
  "mainAPIParams": (params) => {
    return {
      "url": params.url,
      "foldername": params.foldername,
      "filename": params.filename,
    };
  },
  "imageAPIUrl": (folderName, imgName) => {
    return "http://" + config.ip + ":" + config.port + config.imageAPIKey + "?" +
      "foldername=" + encodeURIComponent(folderName) + "&" +
      "filename=" + encodeURIComponent(imgName);
  },
  "imageAPIParams": (params) => {
    return {
      "foldername": params.foldername,
      "filename": params.filename,
    };
  },
  "proxyAPIUrl": (url) => {
    return "http://" + config.ip + ":" + config.port + config.proxyAPIKey + "?" +
      "url=" + encodeURIComponent(url);
  },
  "proxyAPIParams": (params) => {
    return {
      "url": params.url,
    };
  },
  "imagePath": (foldername, filename) => {
    const homedir = os.homedir();
    const imagePath = homedir + "/" + config.configFolder + "/" +
      foldername + "/" + filename;
    return imagePath;
  }
}

module.exports = { config: config }
