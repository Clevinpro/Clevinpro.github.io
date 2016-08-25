import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';

import SocialPerson from 'material-ui/svg-icons/social/person';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import NotificationNetworkLocked from 'material-ui/svg-icons/notification/network-locked';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import ImageCropFree from 'material-ui/svg-icons/image/crop-free';


export default class Layout extends React.Component {

 

  render() {
    const { open } = this.props
    return (
      <div>
        <AppBar
          title="TestoRator"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.props.toggleSidebar}
        />
       
        <Drawer
          ref="LeftNav"
          docked={false}
          width={256}
          open={open}
          onRequestChange={this.props.toggleSidebar}
          
        >
          <MenuItem onTouchTap={ this.props.toggleSidebar} primaryText="View Profile" leftIcon={<SocialPerson />} />
          <MenuItem onTouchTap={ this.props.toggleSidebar} leftIcon={<NotificationNetworkLocked />}>Privacy Settings</MenuItem>
          <MenuItem onTouchTap={ this.props.toggleSidebar} leftIcon={<ActionSettings />}>Settungs</MenuItem>
          <MenuItem onTouchTap={ this.props.toggleSidebar} leftIcon={<ActionExitToApp />}>Logout</MenuItem>
          <Divider />
          <MenuItem onTouchTap={ this.props.toggleSidebar} leftIcon={<ImageCropFree />}>My Courses</MenuItem>
          <MenuItem onTouchTap={ this.props.toggleSidebar} leftIcon={<ImageCropFree />}>My messages</MenuItem>
          <MenuItem onTouchTap={ this.props.toggleSidebar} leftIcon={<ImageCropFree />}>HTML&CSS</MenuItem>
          <MenuItem onTouchTap={ this.props.toggleSidebar} leftIcon={<ImageCropFree />}>Javascript ES6</MenuItem>
          <MenuItem onTouchTap={ this.props.toggleSidebar} leftIcon={<ImageCropFree />}>SVG</MenuItem>
          <MenuItem onTouchTap={ this.props.toggleSidebar} leftIcon={<ImageCropFree />}>React*</MenuItem>
          <MenuItem onTouchTap={ this.props.toggleSidebar} leftIcon={<ImageCropFree />}>Angular</MenuItem>
          <MenuItem onTouchTap={ this.props.toggleSidebar} leftIcon={<ImageCropFree />}>Webpack</MenuItem>
          <Divider />
          <MenuItem onTouchTap={ this.props.toggleSidebar} leftIcon={<ImageCropFree />}>Reference</MenuItem>
          <MenuItem onTouchTap={ this.props.toggleSidebar} leftIcon={<ImageCropFree />}>FAQ</MenuItem>
          <MenuItem onTouchTap={ this.props.toggleSidebar} leftIcon={<ImageCropFree />}>Feedback</MenuItem>
        </Drawer>
      </div>
    );
  }
}