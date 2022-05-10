import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Navbar from "./components/Navbar.js"
import Messages from "./components/Messages/Messages.js";
import NewMessage from "./components/MessageInput/NewMessage.js";
import Notification from './components/Notification/Notification.js';
import "./Chat.css"
import { Dialog, DialogTitle ,TextField, Divider, DialogActions, Button, DialogContent} from '@mui/material';


const Chat = () => {
    const [socket, setSocket] = useState(null);
    const [value, setValue] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const newSocket = io(process.env.REACT_APP_SERVER_URL);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    useEffect(() => {
        const newUser = localStorage.getItem("loggedUser");
        setUser(newUser);
        if(user !== null) socket.emit("login", user);
    }, [socket], [setUser]);

    const handleLogin = () => {
        if(value !== ''){
           localStorage.setItem("loggedUser", value);
           setUser(localStorage.getItem("loggedUser"));
           window.location.reload();
        }
    }

    return(
        <>
            { user ? (
                <div className="container">
                    <Notification socket={socket}/>
                    <div className='header'>
                        <Navbar/>
                    </div>
                    <div className='chat-box'>
                        <Messages socket={socket} />
                    </div>
                    <NewMessage socket={socket} className="chatbox-input"/>
                </div>
            ) : (
                    <Dialog open={true}>
                        <DialogTitle>Login</DialogTitle>
                        <Divider/>
                        <DialogContent>
                            <TextField label="Username" value={value} onChange={(e) => { setValue(e.currentTarget.value); }}/>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={handleLogin}>Login</Button>
                        </DialogActions>
                    </Dialog>
            )}
        </>
    )
}

export default Chat;