import React from 'react'
import { Link } from 'react-router';
import MenuItem from 'material-ui/MenuItem';

import SocialPerson from 'material-ui/svg-icons/social/person';
import NotificationNetworkLocked from 'material-ui/svg-icons/notification/network-locked';


class MenuItems extends React.Component {
     render (){
        const items = [
            {
                id: 1,
                leftIcon: <SocialPerson />,
                primaryText: 'Notes App',
                link: '/NotesApp'
            },
            {
                id: 2,
                leftIcon: <NotificationNetworkLocked />,
                primaryText: 'Hotel Cards',
                link: '/HotelCards'
            }
        ];
        const menuItems = items.map( (item) =>
            <Link key={item.id} to={item.link}>
                <MenuItem

                    primaryText={item.primaryText}
                    leftIcon={item.leftIcon}/>
            </Link>
        );

        return ( <div> {menuItems} </div> )
    }
}
export default MenuItems
    

