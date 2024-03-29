import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import Box  from '@mui/material/Box';
import Kish_light_Logo from '../../img/logoLight.jpg';
import AlertMessage from '../common/AlertMessage'
import loginService from '../../services/login.service';
import Loading from '../common/Loading';
import { useNavigate  } from 'react-router-dom';
import {setuser} from "../../redux/actions/user.action"
import {setChatHubProxy,setlocalconnection} from "../../redux/actions/hubConnection.action"
import {setconnectedusers,setconnectId} from "../../redux/actions/login.action"
import { setMessages,setMessagesByMessageCode } from "../../redux/actions/mainUrgentTable.action";
import {connect} from 'react-redux' ;
import Header from '../common/header';
import Footer1 from '../common/footer';
import Element2 from '../../img/element2.png'
import { HubConnectionBuilder, LogLevel,HttpTransportType } from '@microsoft/signalr';

const useStyles = makeStyles((theme) => ({
  root: {
      width: '100%',
    },
paper: {
  marginTop: theme.spacing(7),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
},
avatar: {
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
},
form: {
  //width: '100%', // Fix IE 11 issue.
  //marginTop: theme.spacing(1),
},
submit: {
  margin: theme.spacing(3, 0, 2),
},
media: {
  height: 0,
  paddingTop: '56.25%', // 16:9,
  marginTop:'30'
}
}));

function Login(props) {
    let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ isOpen: false, status: "error", msg: "" })
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  function validateForm() {
    let isValid = errorUsername === false && errorPassword === false;
    if (username==='') {
      setErrorUsername(true); 
      isValid=false;
    }
    if (password==='') {
      setErrorPassword(true);
      isValid=false;
    }

    return isValid;
  }

  const handleSubmit = async e => {
    
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setIsButtonDisable(true);
    
    const result = await loginService.loginUser({
      username,
      password
    });
    
   
        setIsButtonDisable(false);
        setLoading(false);
      if(result.iserror) {

        localStorage.setItem("kishuritUserCode", 0)

        setAlertMessage({
          isOpen: true,
          status: "error",
          msg:  result.data
      });
     
    }
      else{
      
       props.setuser(result.data);
       localStorage.setItem("kishuritUserName", result.data.userName)
       localStorage.setItem("kishuritUserCode", result.data.userCode)
 
      await Connect(result.data.userName);
      let path = '/UrgetTable';
      navigate(path);
  }

  }

  async function Connect(username) {
   
    
   try {
///
   
    // const connection = new HubConnectionBuilder()
    // .withUrl("https://localhost:44353/chat")
    // .configureLogging(LogLevel.Information)
    // .build();
   
    const HOST_SIGNALR = process.env.REACT_APP_HOST_SIGNALR_KEY || '';
     //debugger;
     let localConnection = window.$.hubConnection(`${HOST_SIGNALR}`);
    localConnection.qs = { 'version': '1.0' };
     var hubProxy = localConnection.createHubProxy('chathub');
     hubProxy.on('SendNewRecords', function (eventName, data) {
      
      props.setMessages(data);
    });
    hubProxy.on('SendUpdatedRow', function (eventName, data) {
      
      props.setMessagesByMessageCode(data);

    });
    hubProxy.on('SendConnectedUserListl', function (data) {
      console.log("SendConnectedUsers");
      props.setconnectedusers(data);

    });
     
   
     await localConnection.start()
     .done(function () { props.setconnectId({ConnectionId : localConnection.id, UserName : username });
       console.log('Now connected, connection ID=' + localConnection.id); })
     .fail(function () { console.log('Could not connect'); });
    
    //SetConnection(localConnection);
    
     await hubProxy.invoke('Connect', username).done(function () {
      console.log('Invocation Succsed');
     }).fail(function (error) {
       console.log('Invocation failed. Error: ' + error);
     });
     await hubProxy.invoke('UserConnect','','').done(function () {
      console.log('Invocation UserConnect Succsed');
     }).fail(function (error) {
       console.log('Invocation failed. Error: ' + error);
     });
     ///
     
    console.log("hubProxy",hubProxy);
    console.log("localConnection",localConnection);
    await props.setChatHubProxy(hubProxy);
    await props.setlocalconnection(localConnection);
     /////
    //  await localConnection.disconnected()
    //  .done(function () {  console.log("מתחבר שוב");
    //                      localConnection.start()
    //                     .done(function () { props.setconnectId({ConnectionId : localConnection.id, UserName : username });
    //                       console.log('Now connected again, connection ID=' + localConnection.id); })
    //                     .fail(function () { console.log('Could not connect'); });
    //  })
    //  .fail(function () { console.log(" לא יכול להתחבר שוב"); });



  //    localConnection.disconnected(function() {
  //      console.log("מתחבר שוב");
  //     setTimeout(function() {
  //       localConnection.start();
  //     }, 2000); // Re-start connection after 5 seconds
  // });
   } catch (error) {
     alert(error);
     console.log(error);
   }
 }

  
  

  const classes = useStyles();
  return(
    
    <div >
      <Header/>
   
    <Container component="main" maxWidth="xs" sx={{position: 'fixed',top:'45%',left: '50%',transform: 'translate(-50%, -50%)',border: "0.1px solid #464648",borderRadius:10,pb:10}} >
      <CssBaseline  />
      <div className={classes.paper} >
        
        <Typography component="h1" variant="h5" >
        <Box sx={{ fontWeight: 'bold', m: 1 }} > כניסה למערכת דחופים</Box>
        </Typography>
        
        <form onSubmit={handleSubmit} className={classes.form} noValidate sx={{}} >
          <TextField 
            error={errorUsername}
            variant="filled" 
            color="warning"
            margin="normal"
            required
            fullWidth
            onChange={e => {
              setUsername(e.target.value);
              if (e.target.value==='') setErrorUsername(true);
              else if (errorUsername===true) setErrorUsername(false);
            }}
            id="username"
            label="שם משתמש"
            name="username"
            
           
          />
          <TextField
            error={errorPassword}
            variant="filled" 
            color="warning"
            margin="normal"
            required
            fullWidth
            onChange={e => {
              setPassword(e.target.value);
              if (e.target.value==='') setErrorPassword(true);
              else setErrorPassword(false);
            }}
            name="password"
            label="סיסמה"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <div style={{marginTop: '20px'}}>
          <Loading loading={loading}/>
          <Button sx={{backgroundColor:'#aac22f','&:hover': {backgroundColor: '#e0871b',color: '#fff'}}}
            disabled={isButtonDisable}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
           className={classes.submit}
          >
            התחברות
          </Button>
          </div>
        </form>
      </div>
    </Container>
      <AlertMessage
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
            />
            <Footer1/>
    </div>
  )
}
export default connect(
    (state)=>({
      chatHubProxy:state.hub.chatHubProxy,
      user:state.user.user,
    }),
    {
      setMessages,
      setMessagesByMessageCode,
      setconnectedusers,
      setuser,
      setconnectId,
      setChatHubProxy,
      setlocalconnection,
    }
  )(Login) ;
// Login.propTypes = {
//     setTempToken: PropTypes.func.isRequired
//   }