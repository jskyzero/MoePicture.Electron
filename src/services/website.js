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

  GetImage() {
    const imgUrl = "https://files.yande.re/sample/1f6c81aee8d7d41466422de7073f502c/yande.re%20520039%20sample%20heels%20kawaikereba_hentai_demo_suki_ni_natte_kuremasu_ka%3F%20seifuku%20tagme%20thighhighs.jpg"
    const url = "http://127.0.0.1:4000" + "/moepicture?" +
                "url=" + encodeURIComponent(imgUrl) +
                "&foldername="+ encodeURIComponent("yande") +
                "&filename=" + encodeURIComponent("test.jpg");
    console.log(url);
    return axios.get(url).then(res => {
      return res.data;
    });
  }
}

export default WebSite;
