    import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Navbar from "./components/Navbar.js"
import Messages from "./components/Messages/Messages.js";
import NewMessage from "./components/MessageInput/NewMessage.js";
import "./Chat.css"

const Chat = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(`http://${window.location.hostname}:3000`);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    return(
        <div className="App">
            <header className="app-header">
                <Navbar/>
            </header>
            { socket ? (
                <div>
                    <div>
                    <Messages socket={socket} />
                    </div>
                    <div className="foot">
                        <NewMessage socket={socket}/>
                    </div>
                </div>
            ) : (
                <div>Not Connected</div>
            )}
        </div>
    )
}

export default Chat;