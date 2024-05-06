
import React, { useEffect } from 'react';
import {Alert} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { uiActions } from '../store/ui-slice';
import './Notification.css'

const Notification = ({ type, message }) => {
    const dispatch = useDispatch();
    const notification = useSelector(state => state.ui.notification);
    const handleClose = () => {
        dispatch(uiActions.showNotification({
            open: false
        }))
    }

    useEffect(() => {
        // Set a timer to close the notification after 5 seconds
        if (notification.open) {
            const timer = setTimeout(() => {
                dispatch(uiActions.showNotification({ open: false }));
            }, 2000); // 5000 milliseconds = 5 seconds

            // Clear the timer when the component unmounts or when notification changes
            return () => clearTimeout(timer);
        }
    }, [dispatch, notification]);
    
  return (
      <div className='notification'>
          {notification.open &&  <Alert onClose={handleClose} severity={type}>{message}</Alert>}
    </div>
  )
}

export default Notification