import React from 'react';
import ImageGridItem from './ImageGridItem'
import WebSite from '../services/website';


class ImageGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      websiteType: props.websiteType,
      items: [],
    };
    this.website = new WebSite(props.websiteType, "");
  }

  componentDidMount() {
    this.getMoreItems();
  }

  componentWillUnmount() {
    this.setState({
      items: [],
    })
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.websiteType !== this.state.websiteType) {
      this.setState({
        items: [],
        websiteType: nextProps.websiteType,
      });
      this.website = new WebSite(nextProps.websiteType, "");
      this.getMoreItems();
    }
  }

  getMoreItems = () => {
    this.website.GetItems().then((newItems) => {
      this.setState((prevState, props) => ({
        items: prevState.items.concat(newItems),
      }));
    });
  }

  scrollCallback = (e) => {
    // console.log(e.target.scrollHeight, e.target.scrollTop, e.target.clientHeight);
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      this.getMoreItems();
    }
  }

  // getImage = () => {
  //   let website = new WebSite(this.state.url);
  //   website.GetImage().then((url) => {
  //     this.setState({ str: url });
  //   });
  // }

  render = () => {
    // todo each width
    let totolWidth = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    let width = 100 / parseInt(totolWidth / 200);

    let items = this.state.items.map((item) => {
      return <ImageGridItem key={item.id} item={item} width={width} />
    });

    return (
      <div style={{
        position: "absolute",
        width: "100%", height: "100vh",
        overflowY: "scroll"
      }}
        onScroll={this.scrollCallback}>

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
