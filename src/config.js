const os = require('os');

const config = {
  // static variable
  "port": 25613,
  "ip": "127.0.0.1",
  "configFolder": ".moepicture",

  // server config
  "mainAPIKey": "/moepicture",
  "imageAPIKey": "/moepicture/img",
  "proxyAPIKey": "/moepicture/proxy",

  // API Part
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

  // Useful static function
  "imagePath": (foldername, filename) => {
    let homedir = os.homedir();
    let imagePath = homedir + "/" + config.configFolder + "/" +
      foldername + "/" + filename;
    return imagePath;
  },

  // WebSite Static variable
  "WebSites": ["Yande", "Konachan", "Danbooru", "Gelbooru", "Safebooru"],
  "WebSiteUrls": {
    "Yande": "https://yande.re/post.xml?limit=100",
    "Konachan": "http://konachan.com/post.xml?limit=100",
    "Danbooru": "https://danbooru.donmai.us/posts.xml?limit=100",
    "Gelbooru": "https://gelbooru.com/index.php?page=dapi&s=post&q=index&limit=100",
    "Safebooru": "http://safebooru.org/index.php?page=dapi&s=post&q=index&limit=100",
  },
  "GetWebSiteUrl": (websiteType, searchTag, pageIndex) => {
    let searchStr = (searchTag === "") ? "" : ("&tags=" + searchTag);
    let url = "";
    switch (websiteType) {
      case "Yande":
      case "Konachan":
      case "Danbooru":
        url = config.WebSiteUrls[websiteType] + "&page=" + pageIndex + searchStr;
        break;
      case "Gelbooru":
      case "Safebooru":
        url = config.WebSiteUrls[websiteType] + "&pid=" + pageIndex + searchStr;
        break;
    }
    console.log(url);
    return url;
  },
  "WebSiteMap": {
    "Yande": {
      "id": "id",
      "title": "id",
      "previewUrl": "preview_url",
      "sampleUrl": "sample_url",
    }
  },
  xmlParserWithAttributes: (item, xmlNode, mapTable) => {
    // console.log(xmlNode.attributes[mapTable["id"]].nodeValue);
    for (let key in mapTable) {
      // console.log(mapTable[key]);
      item[key] = xmlNode.attributes[mapTable[key]].nodeValue;
    }
    return item;
  },
  "ItemFromXML": (item, xmlNode, websiteType) => {
    switch (websiteType) {
      case "Yande":
      case "Konachan":
      case "Danbooru":
        return config.xmlParserWithAttributes(item, xmlNode, config.WebSiteMap[websiteType])
      case "Gelbooru":
      case "Safebooru":
    }
  }
}

module.exports = { config: config }
