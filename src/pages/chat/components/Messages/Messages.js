import React, { useEffect, useState } from 'react';
import './Messages.css';
import { Card, CardContent, Typography, CardActions, Button, Grid, Slide, Zoom } from '@mui/material';

function Messages({ socket }) {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const messageListener = (message) => {
      setMessages((prevMessages) => {
        const newMessages = {...prevMessages};
        newMessages[message.id] = message;
        return newMessages;
      });
    };
  
    const deleteMessageListener = (messageID) => {
      setMessages((prevMessages) => {
        const newMessages = {...prevMessages};
        delete newMessages[messageID];
        return newMessages;
      });
    };
  
    socket.on('message', messageListener);
    socket.on('deleteMessage', deleteMessageListener);
    socket.emit('getMessages');

    return () => {
      socket.off('message', messageListener);
      socket.off('deleteMessage', deleteMessageListener);
    };
  }, [socket]);

  return (
    <>
      {[...Object.values(messages)]
        .sort((a, b) => a.time - b.time)
        .map((message) => (
          <Zoom in={true}>
            <div className={localStorage.getItem("loggedUser") == message.user.username ? "sent" : "received"}>
              <div className="message">
                <div className='message-header'>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {message.user.username}:
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      {new Date(message.time).toLocaleTimeString()}
                    </Typography>
                </div>
                <div className='message-body'>
                  <Typography variant="body2">
                    {message.value}
                  </Typography>
                </div>
              </div>
            </div>
          </Zoom>
        ))
      }
    </>
  );
}

export default Messages;