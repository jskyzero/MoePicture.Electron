import React from 'react';

class ImageGridItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {item: props.item};
  }

  render = () => {
    return (
        <img className="ImageGridItem"
          src={this.state.item.previewUrl}
          alt={this.state.item.title}/>
    )
  }

}

export default ImageGridItem;
