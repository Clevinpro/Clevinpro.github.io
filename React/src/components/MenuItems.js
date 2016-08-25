import React from 'react'
import MenuItem from 'material-ui/MenuItem';

const menuItems = [
    {
        id: 1,
        leftIcon: '<SocialPerson />',
        primaryText: 'View Profile'
    },
    {
        id: 2,
        leftIcon: '<NotificationNetworkLocked />',
        primaryText: 'Privacy Settings'
    },
    {
        id: 3,
        leftIcon: '<ActionSettings />',
        primaryText: 'Settungs'
    },
    {
        id: 4,
        leftIcon: '<ActionExitToApp />',
        primaryText: 'Logout'
    },
    {
        id: 5,
        leftIcon: '<ImageCropFree />',
        primaryText: 'My Courses'
    },
    {
        id: 6,
        leftIcon: '<ImageCropFree />',
        primaryText: 'My messages'
    },
    {
        id: 7,
        leftIcon: '<ImageCropFree />',
        primaryText: 'HTML&CSS'
    },
    {
        id: 8,
        leftIcon: '<ImageCropFree />',
        primaryText: 'Javascript ES6'
    },
    {
        id: 9,
        leftIcon: '<ImageCropFree />',
        primaryText: 'SVG'
    },
    {
        id: 10,
        leftIcon: '<ImageCropFree />',
        primaryText: 'React*'
    },
    {
        id: 11,
        leftIcon: '<ImageCropFree />',
        primaryText: 'Angular'
    },
    {
        id: 12,
        leftIcon: '<ImageCropFree />',
        primaryText: 'Webpack'
    },
    {
        id: 13,
        leftIcon: '<ImageCropFree />',
        primaryText: 'Reference'
    },
    {
        id: 14,
        leftIcon: '<ImageCropFree />',
        primaryText: 'FAQ'
    },
    {
        id: 15,
        leftIcon: '<ImageCropFree />',
        primaryText: 'Feedback'
    }
]


const MenuItems = () => ( 
        menuItems.map((menuItem) => {
            return <MenuItem 
                    primaryText={menuItem.primaryText} 
                    leftIcon={MenuItem.leftIcon} />
        })
)

export default MenuItems