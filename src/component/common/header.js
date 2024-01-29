import * as React from 'react';
import Logo from '../../img/logo.png'
import '../../css/common.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {connect} from 'react-redux' ;
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import ChangingWindow from '../AchmashUrgent/ChangingWindow';
import ChangingWindowService from '../../services/changingWindowService.service'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const Header = (props) => {

  const ITEM_HEIGHT = 48;
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    }
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    }
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    }
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    }
    window.addEventListener("beforeunload", (ev) => 
    {  
      localStorage.setItem("kishuritUserCode", 0)
      localStorage.setItem("kishuritUserName", '')
       props.chatHubProxy.invoke('disConnect', props.ConnectionId.ConnectionId).done(function () {
        console.log('Invocation disConnect Succsed');
       }).fail(function (error) {
         console.log('Invocation disConnect failed. Error: ' + error);
       });
    });
    async function logOut() 
 {
  
 
  await props.chatHubProxy.invoke('disConnect', props.ConnectionId.ConnectionId).done(function () {
    console.log('Invocation disConnect Succsed');
   }).fail(function (error) {
     console.log('Invocation disConnect failed. Error: ' + error);
   });
   localStorage.setItem("kishuritUserCode", 0)
   localStorage.setItem("kishuritUserName", '')
   window.location.href = '/UrgentScreen';
  
 }


 const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log("event.currentTarget",event.currentTarget);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    console.log(e.target.id);
    setAnchorEl(null);
  };






  
    return(
<div dir="rtl">
        <AppBar position="static" sx={{backgroundColor:"black", pb:'40px'}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
            
            </Typography>
  
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
               
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center"></Typography>
                  </MenuItem>
               
              </Menu>
            </Box>       
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <a href="" style={{paddingTop:'10px'}}><img src={Logo} /></a>
                <Button
                
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                
                </Button>
            
            </Box>
  
            <Box sx={{ flexGrow: 0 ,ml:'10px',paddingTop:'10px'}}>
           
            {(Object.keys(props.user).length > 0) && props.connectedUser.some(v => (v.UserName === props.user.userName))?<AccountCircleIcon sx={{color: '#abc42f',fontSize: 40 }} />:<AccountCircleIcon sx={{color: '#e0871b',fontSize: 40 }} />}{props.user.userName}
            
            {props.user.userCode &&(   
        <>
      <IconButton
        aria-label="more"
        id="long-button"
        sx={{color: '#e0871b'}}
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
       
          <MenuItem  >
          
            <ChangingWindow isurgent={false}/>
          </MenuItem>
          {/* <MenuItem  onClick={handleClose}> */}
          <MenuItem  >
            <ChangingWindow isurgent={true} />
          </MenuItem>
   
   
      </Menu>
      </>
     )}
   
      <Button sx={{ mx: "auto", ml:'10px',fontSize: 15, color:"#e0871b"}} onClick={logOut} variant="outlined" size="medium" color="error" >התנתק </Button>
            
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      </div>
    )
 
}
  export default  connect(
    (state)=>({
      user:state.user.user,
      chatHubProxy:state.hub.chatHubProxy,
      ConnectionId:state.login.ConnectionId,
      connectedUser:state.login.ConnectedUsers,
    }),
    {
     
    }
  )(Header) ;
  
                                     


