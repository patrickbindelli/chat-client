import React, { useEffect, useState } from 'react';
import './Messages.css';
import { Card, CardContent, Typography, CardActions, Button, Grid } from '@mui/material';

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
    <div className="message-list">
      {[...Object.values(messages)]
        .sort((a, b) => a.time - b.time)
        .map((message) => (
          <Card key={message.id} className="received"  style={{backgroundColor: "gray"}}>
            <CardContent>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      {message.user.name}:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      {new Date(message.time).toLocaleTimeString()}
                    </Typography>
                  </Grid>
                </Grid>
              <Typography variant="body2">
                {message.value}
              </Typography>
            </CardContent>
        </Card>
        ))
      }
    </div>
  );
}

export default Messages;