import React from 'react';


class ImageGridItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: props.item };
  }

  render = () => {
    return (
      <div>
      {/* {
        this.state.item.isSafe && */}
        <div style={{ height: "200px", width: "10%", float: "left" }}>
        <img
          style={{ width: "100%", height: "100%" }}
          src={this.state.item.previewUrl}
          alt={this.state.item.title} />
      </div>
      {/* } */}
      </div>
    )
  }
}

export default ImageGridItem;
