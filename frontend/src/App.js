import React , {useState,useEffect} from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Chat from './components/chat/Chat';
import Pusher from 'pusher-js';
import axios from './components/axios';
import Login from './components/login/Login';
import { useStateValue } from './components/StateProvider';

function App() {
  const [messages,setMessages]=useState([]);
  const [ { user }, dispatch ]= useStateValue();

  useEffect(()=>{
    axios.get("/messages/sync").then(res=>{
      setMessages(res.data)
    })
  },[])
  useEffect(()=>{
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;
    const pusher = new Pusher('pushercode', {
      cluster: 'eu'
    });
    const channel=pusher.subscribe('messages');
    channel.bind('inserted',(data)=>{
      setMessages([...messages,data])
    });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }
  },[messages])

  console.log(messages)
  return (
    <div className="app">
      {
        !user ? <Login/>: (
          <div className="app__body">
          <Sidebar messages={messages} />
          <Chat messages={messages}/>
    </div>
        )
      }
    </div>
  );
}

export default App;
