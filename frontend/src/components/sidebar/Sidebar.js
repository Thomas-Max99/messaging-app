import React from 'react';
import './Sidebar.css';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton,Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from '../sidebarChat/SidebarChat';
import { useStateValue } from '../StateProvider.js'

const Sidebar = ({messages}) => {
    const [{user},dispatch]=useStateValue()
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                    <div className="sidebar__searchContainer">
                        <SearchIcon/>
                        <input type="text" placeholder="search or start new chat"/>
                    </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat messages={messages} />
            </div>
        </div>
    );
}

export default Sidebar;
