import { keyframes } from "@emotion/core";
import React, { useEffect ,useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import { setMessages,setMessagesByMessageCode } from "../../redux/actions/mainUrgentTable.action";
import {fetchMessages} from "../../redux/actions/mainUrgentTable.action";
import{ setSingleMessage,setIndex} from "../../redux/actions/urgentMessageChild.action"
import {setChatHubProxy,setlocalconnection} from "../../redux/actions/hubConnection.action"
import {setconnectedusers,setconnectId} from "../../redux/actions/login.action"
import {connect} from 'react-redux' ;//כך מחברים את הקומפוננטה לstate
import { datediffToSec,convertSecToTime} from '../functions/commonFunction'
import { format } from 'date-fns';
import { useNavigate  } from 'react-router-dom';
import { da } from "date-fns/locale";
import { Label } from "@mui/icons-material";
import Box from '@mui/material/Box';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Blink from "react-blink";
import Header from "../common/header";
import Footer1 from "../common/footer";
import { red } from "@mui/material/colors";
import Element from '../../img/element.png'

 function UrgetTable(props) {
const [chatHubProxy, SetChatHubProxy] = useState(null);
const [connection, SetConnection] = useState(null);
const [chatMessage, SetChatMessage] = useState("");  
const [flagConnectAgain, SetflagConnectAgain] = useState(0);
const message = props.messages.filter(m => m.Handled_Bit===false)
const messageNotTreat = message.length
let navigate = useNavigate();

  //functions
  function setTimeDiff(OpeningDate)
{
    let timeDiff=parseInt(datediffToSec( new Date(),new Date(OpeningDate)));
    let timeDiffFormat=convertSecToTime(timeDiff);
    let mm=timeDiff/60;
    if(mm>=10 && mm<15){
      timeDiffFormat="!!!!"+timeDiffFormat+"!!!!"

    }
    if(mm>=15){
      timeDiffFormat="####"+timeDiffFormat+"####"
      
    }
    return timeDiffFormat;
}
  


  useEffect(() => {
    Connect();
  },[])
  async function ConnectChat(username) {
    
    try {
    console.log("ConnectChat1")
     const HOST_SIGNALR = process.env.REACT_APP_HOST_SIGNALR_KEY || '';
      
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
      
     console.log("ConnectChat2");
      await localConnection.start()
      .done(function () { props.setconnectId({ConnectionId : localConnection.id, UserName : username });
        console.log('Now connected, connection ID=' + localConnection.id); })
      .fail(function () { console.log('Could not connect'); });
      console.log("ConnectChat3");
      await hubProxy.invoke('Connect', username).done(function () {
       console.log('Invocation Succsed');
      }).fail(function (error) {
        console.log('Invocation failed. Error: ' + error);
      });
      console.log("ConnectChat4");
      await hubProxy.invoke('UserConnect','','').done(function () {
       console.log('Invocation UserConnect Succsed');
      }).fail(function (error) {
        console.log('Invocation failed. Error: ' + error);
      });
      ///
      
     console.log("hubProxyReconnect",hubProxy);
     console.log("localConnectionReconnect",localConnection);
     await props.setChatHubProxy(hubProxy);
     await props.setlocalconnection(localConnection);
     SetflagConnectAgain(flagConnectAgain+1);
    } catch (error) {
      alert("נא לסגור את המערכת ולבצע כניסה בשנית "+"שגיאה: " +error);
      console.log(error);
    }
  }
  useEffect(() => {
    console.log("useeffect localconnection",props.localconnection);
console.log("localconnection:", props.localconnection);
 
    props.localconnection.disconnected(function() {
      console.log("מתחבר שוב");
      ConnectChat(props.user.userName);
      console.log("after ConnectChat")
  });

  },[flagConnectAgain])




  // useEffect(() => {
  //   window.addEventListener("beforeunload", refresh);
  //   return () => {
  //     window.removeEventListener("beforeunload", refresh);
  //   };
  // }, []);
  // const refresh = (e) => {
  //   alert("Osnat");
  //   e.preventDefault();
  //  // e.returnValue = "";
    
  //   navigate("/UrgetTable");
    
  // };

   async function Connect () {
     try{
      await props.fetchMessages();
     }
     catch(error){
      console.log("fetchMessages error:"+error);

     }
   
     
    
  }

 
   const handleClickRow =(index)=>
  {
    
    let path = '/UrgentMessageChild';
    props.setIndex(index);
    props.setSingleMessage(props.messages[index])
    navigate(path);
    //navigate(path,{ state: {index:index} });
  }
 
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const hasTretmentPriority=()=>{
      let flag=false;
      {props.messages.forEach(function(row, i) {
          if (row.TreatmentPriority_Bit&&!row.Handled_Bit)
              flag=true;

      })
        if(flag)
          return true;
        else
          return false;
        
     
    }
  }

  const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    // ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
  }));
 
  /////end function
  return (
    
    <div dir="rtl" >
    
     <Header/>
     
      <div  style={{top: 0, position: 'sticky',backgroundColor:'white',position: 'relative',
    minHeight: '100%'}}>
        {/* //className="col-12" */}
        <Grid container spacing={2} >
  <Grid item xs={10} mt={1} mb={0} >
  
  {hasTretmentPriority()? <div class="animate-flicker">
<p>שימו לב לקדימות דחופים<WarningAmberIcon style={{ color: "#e0871b" ,fontSize: "35px"}}  /></p></div>:'' } 
  
<h5 style={{backgroundColor:'#e0871b'}}>סה"כ הודעות ללא טיפול:{messageNotTreat}</h5>
  
  
  
  {/* <Blink>akuo</Blink> */}
  </Grid>
  <Grid item  mt={5} mb={3} xs={2} >
  
  {/* <Button sx={{ mx: "auto", width: 200,backgroundColor: '#e0871b' }} onClick={logOut} variant="contained">התנתק </Button> */}
  {/* <div style={{  position: 'absolute',right: '40px',top: '50px', fontWeight:'bold'}}>
  <AccountCircleIcon sx={{color: '#6bc0b2'}} />{props.user.userName}
</div> */}
  </Grid>
  </Grid>
        
        </div>
        
        <Grid container spacing={2}  >
        <Grid item xs={10} >
        
        <Paper sx={{ width: '100%', overflow: 'hidden ' }} style={{backgroundImage: `url(${Element})`,backgroundPosition: ('center center'),backgroundRepeat: ('no-repeat'), backgroundsize: 'cover', backgroundSize:'contain'}}>
      <TableContainer sx={{ maxHeight: 650 }} >
      <Table  size='small' sx={{ minWidth: 700 }} stickyHeader aria-label="sticky table" >
        <TableHead>
          <TableRow  sx={{fontWeight:'bold!important'}} >
            <TableCell align="center" style={{fontWeight:'bold'}}>מס' מנוי</TableCell>
            <TableCell align="center" style={{fontWeight:'bold'}} >שם מנוי</TableCell>
            <TableCell align="center" style={{fontWeight:'bold'}}>שם מוקדן</TableCell>
            <TableCell align="center" style={{fontWeight:'bold'}}>מס' הודעה</TableCell>
            <TableCell align="center" style={{fontWeight:'bold'}}>זמן המתנה לטיפול</TableCell>
            <TableCell align="center" style={{fontWeight:'bold'}}>מטפל בדחוף</TableCell>
            <TableCell align="center" style={{fontWeight:'bold'}}>טופל</TableCell>
          </TableRow>
        </TableHead>
        <TableBody  >
          {props.messages
          .sort(function (a, b) {
            //return((a.Handled_Bit === b.Handled_Bit)? 0 : a.Handled_Bit? 1 : -1);
            var o1 = a.Handled_Bit;
            var o2 = b.Handled_Bit;
          
            var p1 = a.OpeningDate_Dat;
            var p2 = b.OpeningDate_Dat;
          
            if (o1 < o2) return -1;
            if (o1 > o2) return 1;
            if (p1 < p2) return -1;
            if (p1 > p2) return 1;
            return 0;

            //return  a.OpeningDate_Dat>(b.OpeningDate_Dat)? -1 : 1 ;
        })
          .map((row,index) => (
            <TableRow
              key={row.MessageCode_Vch}
             
              sx={{background:row.TreatmentPriority_Bit&&!row.Handled_Bit?'#f60000':'', '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={handleClickRow.bind(this,index)}
              
            >
              <TableCell align="center" >{row.ClientNo_Int}</TableCell>
              <TableCell align="center">{row.ClientName_Vch}</TableCell>
              <TableCell align="center">{row.EmployeName_Int}</TableCell>
              <TableCell align="center">{row.MessageCodeCust}</TableCell>
              <TableCell align="center">{row.Handled_Bit? format(new Date(row.OpeningDate_Dat),'dd/MM/yyyy HH:mm:ss'): setTimeDiff(row.OpeningDate_Dat)}</TableCell>
              <TableCell align="center">{row.Color_Vch}</TableCell>
              <TableCell align="center"><Checkbox  defaultChecked={row.Handled_Bit}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
    </Grid>
    <Grid item  xs={2}>
     
    <Grid container spacing={3} >
    <Grid item xs={12} >
    <Button sx={{ mx: "auto", ml:'10px',fontSize: 15, color:"#e0871b"}} onClick={Connect} variant="outlined" size="medium" color="error" > רענן נתונים </Button>
    <h6 style={{ padding: "20px 1px 5px 25px"}}> משתמשים המחוברים כעת למערכת</h6>
    
  </Grid>
    {props.connectedUser
          .map((row,index) => (
  <Grid item xs={12} key={index}>
    {row.UserName!=props.user.userName?<Item style={{ padding: "10px 20px", backgroundColor:'#aac22f',  marginLeft: '30px'}}><AccountCircleIcon/>{row.UserName}</Item>:''}
    
  </Grid>
 
          ))}
          
    </Grid>
    </Grid>
   
    </Grid>
    <Footer1 />
    </div>
  )
}

export default connect(
  (state)=>({
    messages:state.messages.messages,
    chatHubProxy:state.hub.chatHubProxy,
    user:state.user.user,
    connectedUser:state.login.ConnectedUsers,
    ConnectionId:state.login.ConnectionId,
    localconnection:state.hub.localconnection,

  }),
  {
    fetchMessages,
    setMessages,
    setSingleMessage,
    setIndex,
    setChatHubProxy,
    setlocalconnection,
    setMessagesByMessageCode,
    setconnectedusers,
    setconnectId
  }
)(UrgetTable) ;

