import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import IconButton from '@mui/material/IconButton';
const style = {
  position: 'absolute',
  top: '10%',
  height: '75%',  
   width: 1,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  p: 4,
  overflow:'scroll',
};

export default function CustModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div>
       <IconButton onClick={handleOpen} aria-label="zoom in" size="large">
        <ZoomInIcon fontSize="inherit"/>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box dir="rtl" sx={style} dangerouslySetInnerHTML={{ __html:props.content}}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          
        </Box>
      </Modal>
    </div>
  );
}