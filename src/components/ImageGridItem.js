import React from 'react';
import * as PropTypes from "prop-types";
import LazyLoad, { lazyload } from 'react-lazyload';

class ImageGridItem extends React.Component {
  static contextTypes = { theme: PropTypes.object };

  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      width: props.width,
      onClick: props.onClick,
    };
  }

  render = () => {
    const { theme } = this.context;

    return (
      <div className="ImageItem" style={{
        // height: "280px", width: `${this.state.width}%`,
        // height: "280px", width: "280px",
        // width: "100%",
        // float: "left",
        // overflow: "hidden"
      }} onClick={this.state.onClick}>

        <LazyLoad
          height={200}
          offset={100}
          scrollContainer="#ImageScroll"
          placeholder={
            <img className="Image"
          src={"./img/bg.jpg"}
          alt={"图片加载中"}
          style={{
            height:"200px",
            width: "100%",
            verticalAlign: "middle",
        }} />
          }>
        <img className="Image"
          src={this.state.item.sampleUrl}
          alt={this.state.item.sampleUrl}
          style={{
            width: "100%",
            verticalAlign: "middle",
            animation: "fade-in 1s",

        }} />
        </LazyLoad>

        {/* <div className="Content" style={{
          height: "100%", width: "100%",
          position: "relative", top: "-280px",
          padding: "20px"
        }}>
          <h3 style={{ fontFamily: theme.fonts.sansSerifFonts }}>
            {this.state.item.title}
          </h3>
          <p>
          {"Tags: " + this.state.item.tags}
          </p>
        </div> */}
      </div>
    )
  }
}

export default ImageGridItem;
