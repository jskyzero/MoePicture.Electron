import React from 'react';

import Image from "react-uwp/Image";

class ImageGridItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {item: props.item};
  }

  render = () => {
    return (
      <div style={{height: "200px", width: "10%", float:"left"}}>
        <img
          style={{width: "100%"}}
          src={this.state.item.previewUrl}
          alt={this.state.item.title}/>
      </div>

    )
  }

}

export default ImageGridItem;
