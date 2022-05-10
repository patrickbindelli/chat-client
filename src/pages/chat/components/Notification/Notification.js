import React, { useEffect, useState } from 'react';
import { Snackbar} from '@mui/material';

const Notification = ({socket}) => {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false)
  
  
  useEffect(() => {
    const notifListener = (message) => {
      setValue(message.text)
      setOpen(true)
    };
  
    socket.on('notification', notifListener);

    return () => {
      socket.off('notification', notifListener);
    };
  }, [socket]);

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical:'top', horizontal:'rigth' }}
      open={open}
      onClose={handleClose}
      message={value}
      autoHideDuration={1000}
    />
  );
};

export default Notification;