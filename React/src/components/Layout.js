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

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

   handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <div>
        <AppBar
          title="TestoRator"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.handleToggle}
        />
       
        <Drawer
          ref="LeftNav"
          docked={false}
          width={256}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
          
        >
          <MenuItem onTouchTap={this.handleClose} leftIcon={<SocialPerson />}>View Profile</MenuItem>
          <MenuItem onTouchTap={this.handleClose} leftIcon={<NotificationNetworkLocked />}>Privacy Settings</MenuItem>
          <MenuItem onTouchTap={this.handleClose} leftIcon={<ActionSettings />}>Settungs</MenuItem>
          <MenuItem onTouchTap={this.handleClose} leftIcon={<ActionExitToApp />}>Logout</MenuItem>
          <Divider />
          <MenuItem onTouchTap={this.handleClose} leftIcon={<ImageCropFree />}>My Courses</MenuItem>
          <MenuItem onTouchTap={this.handleClose} leftIcon={<ImageCropFree />}>My messages</MenuItem>
          <MenuItem onTouchTap={this.handleClose} leftIcon={<ImageCropFree />}>HTML&CSS</MenuItem>
          <MenuItem onTouchTap={this.handleClose} leftIcon={<ImageCropFree />}>Javascript ES6</MenuItem>
          <MenuItem onTouchTap={this.handleClose} leftIcon={<ImageCropFree />}>SVG</MenuItem>
          <MenuItem onTouchTap={this.handleClose} leftIcon={<ImageCropFree />}>React*</MenuItem>
          <MenuItem onTouchTap={this.handleClose} leftIcon={<ImageCropFree />}>Angular</MenuItem>
          <MenuItem onTouchTap={this.handleClose} leftIcon={<ImageCropFree />}>Webpack</MenuItem>
          <Divider />
          <MenuItem onTouchTap={this.handleClose} leftIcon={<ImageCropFree />}>Reference</MenuItem>
          <MenuItem onTouchTap={this.handleClose} leftIcon={<ImageCropFree />}>FAQ</MenuItem>
          <MenuItem onTouchTap={this.handleClose} leftIcon={<ImageCropFree />}>Feedback</MenuItem>
        </Drawer>
      </div>
    );
  }
}