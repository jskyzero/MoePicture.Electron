import * as React from "react";
import * as PropTypes from "prop-types";

import NavigationView from "react-uwp/NavigationView";
import SplitViewCommand from "react-uwp/SplitViewCommand";
import Shell from "./Shell"

const { config } = require('../config.js');

export default class Navigation extends React.Component {
  static contextTypes = { theme: PropTypes.object };

  constructor(props) {
    super(props);
    this.state = {
      selectType: "Yande"
    };

    // no need in fact
    // this.handleNodeClick = this.handleNodeClick.bind(this);
  }

  NodeClickCallback = (event) => {
    // console.log(event.currentTarget.id);
    this.setState({selectType: event.currentTarget.id});
    // console.log(this.state);
  }

  render() {
    const { theme } = this.context;

    const baseStyle = theme.prefixStyle({
      margin: 0
    });

    const navigationTopNodes = config.WebSites.map((each) =>
      <SplitViewCommand icon={"\uEB9F"} label={each} id = {each}
        onClick={this.NodeClickCallback}/>
    );

    const navigationBottomNode = [
      <SplitViewCommand icon={"\uE713"} label="Settings" id ="Settings"
        onClick={this.NodeClickCallback}/>,
    ];

    return (
      <div style={{ height: "100vh", overflow: "hidden"}}>
          <NavigationView
            isControlled={false}
            style={{width: "100%", height: "100vh", ...baseStyle }}
            pageTitle="&#160;MoePicture"
            displayMode="compact"
            autoResize={false}
            initWidth={48}
            expandedWidth={200}
            defaultExpanded={true}
            navigationTopNodes={navigationTopNodes}
            navigationBottomNodes={navigationBottomNode}
            focusNavigationNodeIndex={0}
          >
          <Shell selectType={this.state.selectType}/>
          </NavigationView>
      </div>
    );
  }
}
