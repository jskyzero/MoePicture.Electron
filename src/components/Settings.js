import * as React from "react";
import * as PropTypes from "prop-types";
import { Checkbox } from '@fluentui/react';

export default class Settings extends React.Component {
  static contextTypes = {
    theme: PropTypes.object
    }

    constructor(props) {
      super(props);
      this.state = {
        settings: props.settings,
      };
  };

  NodeClickCallback = (event, isChecked) => {
    console.log(isChecked);
    // this.props.settings= isChecked;
    this.props.changeSettings(isChecked);
    this.setState({settings:isChecked});
    // console.log(event);
  }

  render() {
    // const { theme } = this.context;
    // const rootStyles = theme.prefixStyle({
    //   display: "flex",
    //   flexDirection: "row",
    //   alignItems: "center",
    // })

    return (
      <div style={{ margin: "20px" }} >
        <h2>Settings</h2>

        <Checkbox
          defaultChecked={false}
          label="Show UnSafe Picture"
          onChange={this.NodeClickCallback}
        />
      </div>
    );
  }
}
