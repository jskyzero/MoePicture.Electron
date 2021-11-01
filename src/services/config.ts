import os from 'os';
// import parser from 'fast-xml-parser';

export const config = {
  // static variable
  "port": 25613,
  "ip": "127.0.0.1",
  "configFolder": ".moepicture",

  // server config
  "mainAPIKey": "/moepicture",  // load or download image
  "imageAPIKey": "/moepicture/img", // load image
  "proxyAPIKey": "/moepicture/proxy",
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
  }
}

// map part
export const WebSiteMap: { [key: string]: any } = {
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
}

export const WebSiteMap2: { [key: string]: any } = {
  "Yande": {
    "isSafe": (value: string) => value === "s",
  },
  "Konachan": {
    "isSafe": (value: string) => value === "s",
  },
  "Danbooru": {
    "isSafe": (value: string) => value === "s",
  },
  "Gelbooru": {
    "isSafe": (value: string) => value === "s",
  },
  "Safebooru": {
    "isSafe": (value: string) => value === "s",
    "previewUrl": (value: string) => "http:" + value,
    "sampleUrl": (value: string) => "http:" + value,
    "sourceUrl": (value: string) => "http:" + value,
  },
}

// API Part
export function mainAPIUrl(imgUrl: string, foldername: string, filename: string) {
  return "http://" + config.ip + ":" + config.port + config.mainAPIKey + "?" +
    "url=" + encodeURIComponent(imgUrl) + "&" +
    "foldername=" + encodeURIComponent(foldername) + "&" +
    "filename=" + encodeURIComponent(filename);
}

export interface mainAPIParams {
  url: number;
  foldername: string;
  filename: string;
}

// export function mainAPIParams(params:mainAPIParams) {
//     return {
//       "url": params.url,
//       "foldername": params.foldername,
//       "filename": params.filename,
//     };
// }

export function imageAPIUrl(folderName: string, imgName: string) {
  return "http://" + config.ip + ":" + config.port + config.imageAPIKey + "?" +
    "foldername=" + encodeURIComponent(folderName) + "&" +
    "filename=" + encodeURIComponent(imgName);
}
// "imageAPIParams": (params) => {
//   return {
//     "foldername": params.foldername,
//     "filename": params.filename,
//   };
// }

export interface imageAPIParams {
  foldername: string;
  filename: string;
}


export function proxyAPIUrl(url: string) {
  return "http://" + config.ip + ":" + config.port + config.proxyAPIKey + "?" +
    "url=" + encodeURIComponent(url);
}

// "proxyAPIParams": (params) => {
//   return {
//     "url": params.url,
//   };
// },

export interface proxyAPIParams {
  url: string;
}


export function imagePath(foldername: string, filename: string) {
  let homedir = os.homedir();
  let imagePath = homedir + "/" + config.configFolder + "/" +
    foldername + "/" + filename;
  return imagePath;
}


export function GetWebSiteUrl(websiteType: string, searchTag: string, pageIndex: number) {
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
}


// logic part
function xmlParserWithAttributes(key: string, xmlNode: any, websiteType: string) {
  return xmlNode.attributes[WebSiteMap[websiteType][key]].nodeValue;
}

function xmlParserWithSubNodes(key: string, xmlNode: any, websiteType: string) {
  return xmlNode.getElementsByTagName(
    WebSiteMap[websiteType][key])[0].childNodes[0].nodeValue
}




function ItemFromXML(xmlNode: any, websiteType: string) {
  let item: Record<string, string> = {};
  try {
    for (let key in WebSiteMap[websiteType]) {
      switch (websiteType) {
        case "Yande":
        case "Konachan":
          item[key] = xmlParserWithAttributes(key, xmlNode, websiteType);
          break;
        case "Danbooru":
          item[key] = xmlParserWithSubNodes(key, xmlNode, websiteType);
          break;
        case "Gelbooru":
        case "Safebooru":
          item[key] = xmlParserWithAttributes(key, xmlNode, websiteType);
          break;
        default:
          break;
      }
    }
    for (let key in WebSiteMap2[websiteType]) {
      item[key] = WebSiteMap2[websiteType][key](item[key]);
    }
    item["isOK"] = "true";
  }
  catch (e) {
    console.log(e);
    console.log(xmlNode);
    console.log(item);
    item["isOK"] = "false";
  }
  finally {
    // console.log(item["isOK"]);
    return item;
  }
}

// end

module.exports = { config: config }
