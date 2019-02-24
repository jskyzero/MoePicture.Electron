import React from 'react';
import * as PropTypes from "prop-types";

export default class SingleImage extends React.Component {
  static contextTypes = { theme: PropTypes.object };

  render() {
    return (
      <div style={{
        width:"100%", height: "100vh" ,
        position: "absolute",
        textAlign: "center",
        display: "none"}}>
      <img src="./img/bg.jpg" alt="./img/bg.jpg"/>
      </div>
    );
  }
}
