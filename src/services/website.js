import axios from 'axios'
import ImageItem from '../models/ImageItem';


class WebSite {
  url = "";

  constructor(url) {
    this.url = url;
  }

  GetItems() {
    return axios.get(this.url)
      .then(response => {
        let parser = new DOMParser();
        let xml = parser.parseFromString(response.data, "application/xml");
        let items = Array.from(xml.getElementsByTagName("post"),
          node => {
            let item = new ImageItem();
            item.id = node.attributes["id"].nodeValue;
            item.title = node.attributes["id"].nodeValue;
            item.previewUrl = node.attributes["preview_url"].nodeValue;
            item.sampleUrl = node.attributes["sample_url"].nodeValue;
            return item;
          });
        return  items;
        // let str = xml.getElementsByTagName("post").item(0).getAttribute("sample_url");
        // this.setState({txt: str});
      })
  }

}

export default WebSite;
