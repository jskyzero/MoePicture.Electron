const os = require('os');

const config = {
  // static variable
  "port": 25613,
  "ip": "127.0.0.1",
  "configFolder": ".moepicture",

  // server config
  "mainAPIKey": "/moepicture",  // load or download image
  "imageAPIKey": "/moepicture/img", // load image
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


  //
  //
  // WebSite Static variable
  //
  //
  // "WebSites": ["Yande", "Konachan", "Danbooru", "Gelbooru", "Safebooru"],
  "WebSites": ["Yande", "Konachan", "Danbooru"],

  "WebSiteUrls": {
    "Yande": "https://yande.re/post.xml?limit=100",
    "Konachan": "https://konachan.com/post.xml?limit=100",
    "Danbooru": "https://danbooru.donmai.us/posts.xml?limit=100",
    "Gelbooru": "https://gelbooru.com/index.php?page=dapi&s=post&q=index&limit=100",
    "Safebooru": "https://safebooru.org/index.php?page=dapi&s=post&q=index&limit=100",
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
      default:
        break;
    }
    console.log(url);
    return url;
  },

  // map part
  "WebSiteMap": {
    "Yande": {
      "id": "id",
      "title": "id",
      "tags": "tags",
      "previewUrl": "preview_url",
      "sampleUrl": "sample_url",
      "sourceUrl": "jpeg_url",
      "isSafe": "rating",
      "width": "preview_width",
      "height": "preview_height",
    },
    "Konachan": {
      "id": "id",
      "tags": "tags",
      "title": "id",
      "previewUrl": "preview_url",
      "sampleUrl": "sample_url",
      "sourceUrl": "jpeg_url",
      "isSafe": "rating",
      "width": "preview_width",
      "height": "preview_height",
    },
    "Danbooru": {
      "id": "id",
      "tags": "tag-string-general",
      "title": "id",
      "previewUrl": "preview-file-url",
      "sampleUrl": "file-url",
      "sourceUrl": "large-file-url",
      "isSafe": "rating",
      "width": "image-width",
      "height": "image-height",
    },
    "Gelbooru": {
      "id": "id",
      "tags": "tags",
      "title": "id",
      "previewUrl": "preview_url",
      "sampleUrl": "sample_url",
      "sourceUrl": "file_url",
      "isSafe": "rating",
      "width": "preview_width",
      "height": "preview_height",
    },
    "Safebooru": {
      "id": "tags",
      "tags": "tags",
      "title": "id",
      "previewUrl": "preview_url",
      "sampleUrl": "sample_url",
      "sourceUrl": "file_url",
      "isSafe": "rating",
      "width": "preview_width",
      "height": "preview_height",
    },
  },
  "WebSiteMap2": {
    "Yande": {
      "isSafe": (value) => value === "s",
    },
    "Konachan": {
      "isSafe": (value) => value === "s",
    },
    "Danbooru": {
      "isSafe": (value) => value === "s",
    },
    "Gelbooru": {
      "isSafe": (value) => value === "s",
    },
    "Safebooru": {
      "isSafe": (value) => value === "s",
      "previewUrl": (value) => "http:" + value,
      "sampleUrl": (value) => "http:" + value,
      "sourceUrl": (value) => "http:" + value,
    },
  },

  // logic part
  xmlParserWithAttributes: (key, xmlNode, websiteType) =>
      xmlNode.attributes[config.WebSiteMap[websiteType][key]].nodeValue,
  xmlParserWithSubNodes: (key, xmlNode, websiteType) =>
      xmlNode.getElementsByTagName(
          config.WebSiteMap[websiteType][key])[0].childNodes[0].nodeValue,
  "ItemFromXML": (xmlNode, websiteType) => {
    let item = {};
    try {
      for (let key in config.WebSiteMap[websiteType]) {
        switch (websiteType) {
          case "Yande":
          case "Konachan":
            item[key] = config.xmlParserWithAttributes(key, xmlNode, websiteType);
            break;
          case "Danbooru":
            item[key] =  config.xmlParserWithSubNodes(key, xmlNode, websiteType);
            break;
          case "Gelbooru":
          case "Safebooru":
            item[key] = config.xmlParserWithAttributes(key, xmlNode, websiteType);
            break;
          default:
            break;
        }
      }
      for (let key in config.WebSiteMap2[websiteType]) {
        item[key] = config.WebSiteMap2[websiteType][key](item[key]);
      }
      item["isOK"] = item["isSafe"];
    }
    catch (e) {
      console.log(e);
      console.log(xmlNode);
      console.log(item);
      item["isOK"] = false;
    }
    finally {
      // console.log(item["isOK"]);
      return item;
    }
  }

  // end
}

module.exports = { config: config }
