import * as React from "react";
import * as PropTypes from "prop-types";

// import NavigationView from "react-uwp/NavigationView";
// import SplitViewCommand from "react-uwp/SplitViewCommand";

import { Nav } from '@fluentui/react/lib/Nav';

import Shell from "./Shell"

// const { config } = require('../config.js');

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

  NodeClickCallback = (event, item) => {
    // console.log(item);
    this.setState({ selectType: item.key });
    // console.log(this.state);
  }

  render() {


    const navLinkGroups = [
      {
        links: [
          {
            icon: 'ImageCrosshair',
            name: 'Yande',
            key: 'Yande',
            target: 'Yande',
          },
          {
            icon: 'FileImage',
            name: 'Konachan',
            key: 'Konachan',
            target: 'Konachan',
          },
          {
            icon: 'ImageDiff',
            name: 'Danbooru',
            key: 'Danbooru',
            target: 'Danbooru',
          },

          {
            icon: 'Folder',
            name: 'Local',
            isExpanded: true,
            target: 'Local',
            disabled: true,
          },
          {
            icon:'Settings',
            name: 'Settings',
            key: 'Settings',
            target: 'Settings',
          }
        ],
      },
    ];

    return (
      <div style={{
        overflow: "hidden",
        position: 'relative',
        minHeight: '100vh',
        }}>
        <div style={{
            width: "160px",
            height: "100%",
            position: "absolute",
            boxSizing: 'border-box',
            border: '1px solid #eee',
            // float: "left",
          }}>
          <Nav
            onLinkClick={ this.NodeClickCallback.bind(this)}
            selectedKey={this.state.selectType}
            groups={navLinkGroups}
            styles={{
              height: "100%",
            }}
          />
        </div>

        <Shell selectType={this.state.selectType} />

      </div>
    );
  }
}
