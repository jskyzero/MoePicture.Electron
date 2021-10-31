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

  UNSAFE_componentWillReceiveProps(nextProps) {
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

  getImage = (ImgUrl, fileName, e) => {
    this.website.GetImage(ImgUrl, this.website.type, fileName + ".jpg");
    // this.website.GetImage().then((url) => {
    //   this.setState({ str: url });
    // });
  }

  render = () => {
    // todo each width
    let totolWidth = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    let width = 100 / parseInt(totolWidth / 200);

    let items = this.state.items.map((item) => {
      return <ImageGridItem key={item.id} item={item} width={width}
                onClick={this.getImage.bind(this, item.sampleUrl, item.id)}/>
    });

    let colItem1 = items.filter((item, index) => 0 === index % 4);
    let colItem2 = items.filter((item, index) => 0 === index  % 4 -1);
    let colItem3 = items.filter((item, index) => 0 === index  % 4 -2);
    let colItem4 = items.filter((item, index) => 0 === index  % 4 -3);


    return (
      <div
        id="ImageScroll"
        style={{
        height: "100vh",
        overflowY: "scroll",
        display: "flex"
      }}
        onScroll={this.scrollCallback}>

        <div style={{
          flex:"25%",
          maxWidth: "25%",
        }}>
          {colItem1}
        </div>

        <div style={{
          flex:"25%",
          maxWidth: "25%",
        }}>
          {colItem2}
        </div>

        <div style={{
          flex:"25%",
          maxWidth: "25%",
        }}>
          {colItem3}
        </div>

        <div style={{
          flex:"25%",
          maxWidth: "25%",
        }}>
          {colItem4}
        </div>

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
