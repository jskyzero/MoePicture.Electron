import React from 'react';
import ImageGridItem from './ImageGridItem'
import WebSite from '../services/website';
import Button from "react-uwp/Button";


class ImageGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      url: 'https://yande.re/post.xml?limit=100',
      str: null
    };
  }

  componentDidMount() {
    let website = new WebSite(this.state.url);
    website.GetItems().then((items) => {
      this.setState({
        items: items
      })
    });
    // let str = xml.getElementsByTagName("post").item(0).getAttribute("sample_url");
    // this.setState({txt: str});
  }

  componentWillUnmount() {

  }

  getImage = () => {
    let website = new WebSite(this.state.url);
    website.GetImage().then((url) => {
      this.setState({str: url});
    });
  }

  render = () => {
    let items = this.state.items ? this.state.items.map((item) => {
      return <ImageGridItem key={item.id} item={item}/>
    }) : null;

    return (
      <div style={{overflow: "auto", height:"100vh"}}>
          {items}
          {/* <Button onClick={this.getImage}
            tooltip="Mini Tooltip">
          {this.state.str || "click" }
          </Button> */}
          {/* { this.state.str != null &&
          <img src={this.state.str}></img>} */}
      </div>
    )
  }

}

export default ImageGrid;
