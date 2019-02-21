import React from 'react';
import ImageGridItem from './ImageGridItem'
import WebSite from '../services/website';


class ImageGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      url: 'https://yande.re/post.xml?limit=100'
    };
  }

  componentDidMount() {
    let website = new WebSite(this.state.url);
    website.GetItems().then((items) => {
      this.setState({items: items})
    });
    // let str = xml.getElementsByTagName("post").item(0).getAttribute("sample_url");
    // this.setState({txt: str});
  }

  componentWillUnmount() {

  }

  render = () => {
    let items = this.state.items ? this.state.items.map((item) => {
      return <ImageGridItem key={item.id} item={item}/>
    }) : null;

    return (
      <div>
          {items}
      </div>
    )
  }

}

export default ImageGrid;
