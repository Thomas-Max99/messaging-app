import React, {useState,useEffect} from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { IconButton,Avatar } from '@mui/material';
import './Chat.css';
import axios from '../axios.js'
import { useStateValue } from '../StateProvider.js';
const Chat = ({messages}) => {
    const [{user},dispatch]=useStateValue();
    const [seed,setSeed]=useState("");
    const [input,setInput]=useState("");
    const sendMessage=async (event)=>{
        event.preventDefault();
        await axios.post("/messages/new",{
            message: input,
            name: user.displayName,
            timestamp: new Date().toUTCString(),
            received:true
        })
        setInput("")
    }
    useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000))
    },[])
    return (
        <div className="chat">
            <div className="chat__header">
            <Avatar src={`https://avatars.dicebear.com/api/human/b${seed}.svg`} />
            <div className="chat__headerInfo">
                <h3>MERN Help</h3>
                <p>Last seen at {" "}
                {messages[messages.length-1]?.timestamp}
                </p>
            </div>
            <div className="chat__headerRight">
                <IconButton>
                    <SearchOutlinedIcon/>
                </IconButton>
                <IconButton>
                    <AttachFileIcon/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </div>
            </div>
            <div className="chat__body">

                {
                    messages.map(message=>(
                        <p className={`chat__message ${ message.name === user.displayName && 'chat__receiver'}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">{message.timestamp}</span>
                    </p>
                    ))
                }
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon/>
                <form>
                    <input value={input} onChange={event=>setInput(event.target.value)} placeholder="type a message" type="text"/>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon/>
            </div>
        </div>
    );
}

export default Chat;
