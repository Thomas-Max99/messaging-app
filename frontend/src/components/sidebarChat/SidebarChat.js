import React, {useState,useEffect} from 'react';
import { Avatar } from '@mui/material'
import './SidebarChat.css';

const SidebarChat = ({messages}) => {
    const [seed,setSeed]=useState("")
    useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000))
    },[])
    return (
        <div className="sidebarchat">
            <Avatar src={`https://avatars.dicebear.com/api/human/
b${seed}.svg`} />
            <div className="sidebar__chatinfo">
                <h2>MERN Help</h2>
                <p>{messages[messages.length -1]?.message}</p>
            </div>
        </div>
    );
}

export default SidebarChat;
