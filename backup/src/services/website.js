import axios from 'axios'

const { config } = require('../config.js');

class WebSite {

  constructor(websiteType, searchTag) {
    this.type = websiteType;
    this.tag = searchTag;
    this.index = 1;
  }

  GetItems(notSafe=false) {
    return axios.get(config.proxyAPIUrl(
      config.GetWebSiteUrl(this.type, this.tag, this.index++)
    ))
    .then(response => {
        let xml = (new DOMParser()).parseFromString(response.data, "application/xml");
        let items = Array.from(xml.getElementsByTagName("post"),
          node => config.ItemFromXML(node, this.type)).filter(
            item => {return item.isOK && ((!notSafe && item.isSafe) || notSafe)}
          );
        return items;
      })
  }

  GetImage(imgUrl, folderName, fileName) {
    const url = config.mainAPIUrl(imgUrl, folderName, fileName);
    console.log(url);
    axios.get(url);
    // return axios.get(url).then(res => {
    //   // return "file:///" + res.data;
    //   return config.imageAPIUrl(folderName, fileName);
    // });
  }

}

export default WebSite;
