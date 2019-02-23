import axios from 'axios'
import ImageItem from '../models/ImageItem';
const { config } = require('../config.js');

class WebSite {

  constructor(websiteType, searchTag) {
    this.type = websiteType;
    this.tag = searchTag;
    this.index = 1;
  }

  GetItems() {
    return axios.get(config.proxyAPIUrl(
      config.GetWebSiteUrl(this.type, this.tag, this.index++)
    ))
    .then(response => {
        let parser = new DOMParser();
        let xml = parser.parseFromString(response.data, "application/xml");
        let items = Array.from(xml.getElementsByTagName("post"),
          node => config.ItemFromXML(new ImageItem(), node, this.type));
        return items;
      })
  }

  GetImage(imgUrl) {
    const url = config.mainAPIUrl(imgUrl, "yande", "test.jpg");
    console.log(url);
    return axios.get(url).then(res => {
      // return "file:///" + res.data;
      return config.imageAPIUrl("yande", "test.jpg");
    });
  }

}

export default WebSite;
