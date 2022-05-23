import * as React from 'react';
import Logo from '../../img/logo.png'
import Element from '../../img/element.png'
import '../../css/common.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Grid from '@mui/material/Grid';
import {connect} from 'react-redux' ;
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = (props) => {
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

    async function logOut() 
 {
  await props.chatHubProxy.invoke('disConnect', props.ConnectionId.ConnectionId).done(function () {
    console.log('Invocation disConnect Succsed');
   }).fail(function (error) {
     console.log('Invocation disConnect failed. Error: ' + error);
   });
  window.location.href = '/';
 }

 
    return(

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
            {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
             
            </Typography> */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <a href="" style={{paddingTop:'10px'}}><img src={Logo} /></a>
                <Button
                
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                
                </Button>
            
            </Box>
  
            <Box sx={{ flexGrow: 0 ,ml:'10px',paddingTop:'10px'}}>
           
            <AccountCircleIcon sx={{color: '#e0871b',fontSize: 40 }} />{props.user.userName}
            
            <Button sx={{ mx: "auto", ml:'10px',fontSize: 15, color:"#e0871b"}} onClick={logOut} variant="outlined" size="medium" color="error" >התנתק </Button>

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
               
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center"></Typography>
                  </MenuItem>
              
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    )
 
}
  export default  connect(
    (state)=>({
      user:state.user.user,
    }),
    {
     
    }
  )(Header) ;
  
                                     


