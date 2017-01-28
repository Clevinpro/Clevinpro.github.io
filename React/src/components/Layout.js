import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Drawer from 'material-ui/Drawer';
import MenuItems from './MenuItems';
import AppBar from 'material-ui/AppBar';

// import Divider from 'material-ui/Divider';



class Layout extends Component {
  render() {
    const { open } = this.props;
    return (
      <div>
        <AppBar
          title="TestoRator"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.props.toggleSidebar}
          onTitleTouchTap={() => this.props.router.push('')}
        />
       
        <Drawer
          ref="LeftNav"
          docked={false}
          width={256}
          open={open}
          onRequestChange={this.props.toggleSidebar}
          
        >
          <MenuItems toggleSidebar={this.props.toggleSidebar} />
        </Drawer>
        
      </div>
    );
  }
}

export default withRouter(Layout);