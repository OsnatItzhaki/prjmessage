import React from 'react'
//import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { useTheme } from  '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const useStyles = makeStyles((theme) => ({
    dialog: {
        // padding: useTheme().spacing(2),
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        textAlign: 'center'
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    },
    titleIcon: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '8rem',
        }
    }
}))

export default function ConfirmDialog(props) {

    const { confirmDialog, setConfirmDialog } = props;
    const classes = useStyles()

    return (
       
        <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
            <DialogTitle className={classes.dialogTitle}>
                {/* <IconButton disableRipple className={classes.titleIcon}>
                    <NotListedLocationIcon />
                </IconButton> */}
            </DialogTitle>
            <DialogContent className={classes.dialogContent} >
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
            <Button
                    color="primary"
                    onClick={confirmDialog.onConfirm}>כן</Button>
                <Button                   
                    //color="warning"
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} >לא</Button>
            </DialogActions>
        </Dialog>
      
    )
}