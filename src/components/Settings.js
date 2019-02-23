import * as React from "react";
import * as PropTypes from "prop-types";

export default class Settings extends React.Component {
  static contextTypes = { theme: PropTypes.object };

  render() {
    const { theme } = this.context;
    const rootStyles = theme.prefixStyle({
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    })

    return (
      <div style={rootStyles} >
        Settings
      </div>
    );
  }
}
