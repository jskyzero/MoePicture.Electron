import React from 'react';
import * as PropTypes from "prop-types";


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
        height: "280px", width: `${this.state.width}%`,
        float: "left", overflow: "hidden"
      }} onClick={this.state.onClick}>
        <div className="Image" style={{
          height: "100%", width: "100%",
          backgroundImage: `url(${this.state.item.previewUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}>
          {/* {
        this.state.item.isSafe && */}
          {/* } */}
        </div>
        <div className="Content" style={{
          height: "100%", width: "100%",
          position: "relative", top: "-280px"
        }}>
          <h3 style={{ fontFamily: theme.fonts.sansSerifFonts }}>
            {this.state.item.title}
          </h3>
          <p>
          {"Tags: " + this.state.item.tags}
          </p>
        </div>
      </div>
    )
  }
}

export default ImageGridItem;
