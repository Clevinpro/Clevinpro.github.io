import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItems from './MenuItems';
import AppBar from 'material-ui/AppBar';

// import Divider from 'material-ui/Divider';



    export default class Layout extends React.Component {

 

  render() {
    const { open } = this.props;
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
          <MenuItems toggleSidebar={this.props.toggleSidebar} />
        </Drawer>
        
      </div>
    );
  }
}