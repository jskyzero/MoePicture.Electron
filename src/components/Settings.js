import * as React from "react";
import * as PropTypes from "prop-types";
import CheckBox from "react-uwp/CheckBox";

export default class Settings extends React.Component {
  static contextTypes = {
    theme: PropTypes.object
    }

    constructor(props) {
      super(props);
      // this.state = {
      //   checked: false,
      // };

  };

  NodeClickCallback = (event) => {
    // this.setState({checked:!this.state.checked});
    // console.log(this.state);
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

        <CheckBox
          defaultChecked={false}
          label="Show UnSafe Picture"
          onClick={this.NodeClickCallback}
        />
      </div>
    );
  }
}
