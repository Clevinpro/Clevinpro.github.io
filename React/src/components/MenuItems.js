import React from 'react'
import MenuItem from 'material-ui/MenuItem';

import SocialPerson from 'material-ui/svg-icons/social/person';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import NotificationNetworkLocked from 'material-ui/svg-icons/notification/network-locked';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import ImageCropFree from 'material-ui/svg-icons/image/crop-free';


class MenuItems extends React.Component {
     render (){
        const items = [
            {
                id: 1,
                leftIcon: <SocialPerson />,
                primaryText: 'View Profile',
                onTouchTap: this.props.toggleSidebar
            },
            {
                id: 2,
                leftIcon: <NotificationNetworkLocked />,
                primaryText: 'Privacy Settings',
                onTouchTap: this.props.toggleSidebar
            },
            {
                id: 3,
                leftIcon: <ActionSettings />,
                primaryText: 'Settungs',
                onTouchTap: this.props.toggleSidebar
            },
            {
                id: 4,
                leftIcon: <ActionExitToApp />,
                primaryText: 'Logout',
                onTouchTap: this.props.toggleSidebar
            },
            {
                id: 5,
                leftIcon: <ImageCropFree />,
                primaryText: 'My Courses',
                onTouchTap: this.props.toggleSidebar
            },
            {
                id: 6,
                leftIcon: <ImageCropFree />,
                primaryText: 'My messages',
                onTouchTap: this.props.toggleSidebar
            },
            {
                id: 7,
                leftIcon: <ImageCropFree />,
                primaryText: 'HTML&CSS',
                onTouchTap: this.props.toggleSidebar
            },
            {
                id: 8,
                leftIcon: <ImageCropFree />,
                primaryText: 'Javascript ES6',
                onTouchTap: this.props.toggleSidebar
            },
            {
                id: 9,
                leftIcon: <ImageCropFree />,
                primaryText: 'SVG',
                onTouchTap: this.props.toggleSidebar
            },
            {
                id: 10,
                leftIcon: <ImageCropFree />,
                primaryText: 'React*',
                onTouchTap: this.props.toggleSidebar
            },
            {
                id: 11,
                leftIcon: <ImageCropFree />,
                primaryText: 'Angular',
                onTouchTap: this.props.toggleSidebar
            },
            {
                id: 12,
                leftIcon: <ImageCropFree />,
                primaryText: 'Webpack',
                onTouchTap: this.props.toggleSidebar
            },
            {
                id: 13,
                leftIcon: <ImageCropFree />,
                primaryText: 'Reference',
                onTouchTap: this.props.toggleSidebar
            },
            {
                id: 14,
                leftIcon: <ImageCropFree />,
                primaryText: 'FAQ',
                onTouchTap: this.props.toggleSidebar
            },
            {
                id: 15,
                leftIcon: <ImageCropFree />,
                primaryText: 'Feedback',
                onTouchTap: this.props.toggleSidebar
            }
        ]
        const menuItems = items.map( (item) => 
                            <MenuItem
                            key={item.id}    
                            primaryText={item.primaryText} 
                            leftIcon={item.leftIcon}
                            onTouchTap={item.onTouchTap} /> ) 
        return ( <div> {menuItems} </div> )
    }
}
export default MenuItems
    

