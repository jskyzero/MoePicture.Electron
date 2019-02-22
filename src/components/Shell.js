import React from 'react';
import Settings from './Settings';
import ImageGrid from './ImageGrid';

export default class Shell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectType: props.selectType
    };
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.selectType !== this.state.selectType) {
      this.setState({ selectType: nextProps.selectType });
    }
  }


  render = () => {
    if (this.state.selectType === "Settings") {
      return <Settings />
    } else {
      return <ImageGrid />
    }
  }

}
