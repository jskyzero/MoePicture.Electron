import React from 'react';
import Settings from './Settings';
import ImageGrid from './ImageGrid';
const { config } = require('../config.js');



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


  render = () => (
    <div style={{ marginLeft: "48px"}}>
      {this.state.selectType === "Settings" &&
        <Settings />
      }
      {config.WebSites.indexOf(this.state.selectType) > -1 &&
        <ImageGrid websiteType={this.state.selectType}/>
      }
    </div>
  );

}
