import React, { useState } from 'react';
import './NewMessage.css';
import { TextField, IconButton } from '@mui/material';
import { Send, EmojiEmotions } from '@mui/icons-material';

const NewMessage = ({socket}) => {
  const [value, setValue] = useState('');
  const submitForm = (e) => {
    e.preventDefault();
    socket.emit('message', value);
    setValue('');
  };

  return (
    <div className='container'>
      <IconButton>
        <EmojiEmotions className="icon"/>
      </IconButton>
      <TextField
        autoFocus
        label=""
        placeholder="Digite sua mensagem..."
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
        multiline
        maxRows={4}
        value = {value}
        onKeyPress={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            submitForm(e)
          }
        }}
        className="input"/>
      <IconButton onClick={submitForm} >
        <Send className="icon"/>
      </IconButton>
    </div>
  );
};

export default NewMessage;