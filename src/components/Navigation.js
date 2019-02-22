import * as React from "react";
import * as PropTypes from "prop-types";

import NavigationView from "react-uwp/NavigationView";
import SplitViewCommand from "react-uwp/SplitViewCommand";
import Shell from "./Shell"

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

  handleNodeClick = (event) => {
    // console.log(event.currentTarget.id);
    this.setState({selectType: event.currentTarget.id});
    // console.log(this.state);
  }

  render() {
    const { theme } = this.context;

    const baseStyle = theme.prefixStyle({
      margin: 0
    });

    const navigationTopNodes = [
      <SplitViewCommand icon={"\uEB9F"} label="Yande" id ="Yande"
        onClick={this.handleNodeClick}/>,
    ];

    const navigationBottomNode = [
      <SplitViewCommand icon={"\uE713"} label="Settings" id ="Settings"
        onClick={this.handleNodeClick}/>,
    ];

    return (
      <div>
          <NavigationView
            isControlled={false}
            style={{ width: "100%", minHeight: "100vh", ...baseStyle }}
            pageTitle="MoePicture"
            displayMode="compact"
            autoResize={true}
            initWidth={48}
            expandedWidth={240}
            defaultExpanded={false}
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
