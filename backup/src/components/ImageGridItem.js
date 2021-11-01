import React from 'react';
import * as PropTypes from "prop-types";
import LazyLoad from 'react-lazyload';
const { config } = require('../config.js');

class ImageGridItem extends React.Component {
  static contextTypes = { theme: PropTypes.object };

  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      mainAPIUrl: props.mainAPIUrl,
      onClick: props.onClick,
    };
  }

  OnErrorCallback = (event) => {
    // console.log(event.currentTarget.src);
    event.currentTarget.src = config.proxyAPIUrl(this.state.item.sampleUrl);
    // console.log(event.srcElement);

    // event.srcElement.src = config.proxyAPIUrl(this.state.sampleUrl);
    // console.log(this.state);
  }

  OnLoadCallback = (event) => {
    event.currentTarget.style.opacity = 1;
    event.currentTarget.style.animation = "blur-out 0.5s";
    // console.log(event.srcElement);

    // event.srcElement.src = config.proxyAPIUrl(this.state.sampleUrl);
    // console.log(this.state);
  }

  render = () => {

    return (
      <div className="ImageItem" style={{
        overflow: 'hidden',
        margin: "1px",
        borderRadius: "5px",
        // border: "1px solid #b2c8dc"
      }} onClick={this.state.onClick}>

        <LazyLoad
          height={200}
          offset={400}
          scrollContainer="#ImageScroll"
        >
          <div style={{
            position: "relative",
          }}>

            <div style={{
              position: "relative",
              width: "100%",
            }}>
              <img className="Image"
                onError={this.OnErrorCallback}
                onLoad={this.OnLoadCallback}
                src={this.state.mainAPIUrl}
                alt={this.state.item.sampleUrl}
                style={{
                  position: "absolute",
                  width: "100%",
                  verticalAlign: "middle",
                  opacity: 0,
                  zIndex:"1",
                }} />
            </div>

            <div className="Content" style={{
              position: "absolute",
              padding: "20px"
            }}>
              <h3 style={{ }}>
                {this.state.item.title}
              </h3>
              <p>
                {"Tags: " + this.state.item.tags}
              </p>
            </div>
          </div>

          <img className="Image"
            onError={this.OnErrorCallback}
            src={this.state.item.previewUrl}
            alt={this.state.item.sampleUrl}
            style={{
              width: "100%",
              verticalAlign: "middle",
              animation: "blur-in 2s",
              filter: "blur(4px)",
            }} />
        </LazyLoad>


      </div>
    )
  }
}

export default ImageGridItem;
