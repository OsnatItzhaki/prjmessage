import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";


function AlertMessage(props) {
    
      
  const { alertMessage, setAlertMessage } = props;



  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setAlertMessage({ ...alertMessage, isOpen: false })
  }

  return (
    <Snackbar  anchorOrigin={{ vertical:"top", horizontal:"center" }} open={alertMessage.isOpen} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertMessage.status} sx={{ width: '100%' }}>
          {alertMessage.msg}
        </Alert>
      </Snackbar>
    
  );
}
export default AlertMessage;
