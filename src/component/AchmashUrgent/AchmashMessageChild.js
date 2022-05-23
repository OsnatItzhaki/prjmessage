import React, { useEffect ,useState} from "react";
import '../../css/common.css'
import KishuritLogo from '../common/KishuritLogo'
import { setSingleMessage,setIndex } from "../../redux/actions/urgentMessageChild.action";
import {connect} from 'react-redux' ;//כך מחברים את הקומפוננטה לstate
import { useNavigate ,useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import CustModal from "../common/Modal";
import {invokeHubProxyRowUpdated} from "../../redux/actions/hubConnection.action"
import Kish_light_Logo from '../../img/logoLight.jpg';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Header from "../common/header";
import Footeracmash from "../common/Footerforacmash";



 function UrgentMessageChild(props)
{
 
  
  //const { state } = useLocation();
  const [iframeforModal,setiframeforModal]=useState('');
  const [messageforModal,setmessageforModal]=useState('');
  function createData(clientname, clientnumber, messagecodecust, date, employename,urgenttreatname) {
    return { clientname, clientnumber, messagecodecust, date, employename,urgenttreatname };
  }
  const rows = [
    createData(props.singleMessage.ClientName_Vch, 
    props.singleMessage.ClientNo_Int,
    props.singleMessage.MessageCodeCust, 
    format(new Date(props.singleMessage.OpeningDate_Dat),'dd/MM/yyyy HH:mm:ss'), 
    props.singleMessage.EmployeName_Int,
    props.singleMessage.urgentTreatName)
    
   
  ];
  

   useEffect(() => {

    const init =  () => {
      setiframeforModal('<iframe height="100%" width="100%"  src='+props.singleMessage.urgentlines+ ' />');
      setmessageforModal(props.singleMessage.MessageText_Txt+props.singleMessage.InternalMessage_txt+ props.singleMessage.ExtraMessage_Vch);
    }
  
    init()
   
  }, [props.singleMessage])

   


  
return (
    
    <div dir="rtl">
      <Header/>
      {/* <KishuritLogo/> */}
    
     
    <TableContainer className="container h" sx={{ my: "80px",  marginLeft: 'auto', marginright: 'auto'}} component={Paper}  >
      <Table sx={{ }} size="small" aria-label="a dense table" >
        <TableHead>
          <TableRow sx={{ bgcolor: "#aac22f" }}>
            <TableCell align="center" style={{fontWeight:'bold'}}>שם מנוי</TableCell>
            <TableCell align="center" style={{fontWeight:'bold'}}>מספר מנוי</TableCell>
            <TableCell align="center" style={{fontWeight:'bold'}}>קוד הודעה</TableCell>
            <TableCell align="center" style={{fontWeight:'bold'}}>תאריך</TableCell>
            <TableCell align="center" style={{fontWeight:'bold'}}>מוקדן</TableCell>
            <TableCell align="center" style={{fontWeight:'bold'}}>מטפל בדחוף</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.clientname}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.clientname}
              </TableCell>
              <TableCell align="center">{row.clientnumber}</TableCell>
              <TableCell align="center">{row.messagecodecust}</TableCell>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center">{row.employename}</TableCell>
              <TableCell align="center">{row.urgenttreatname}</TableCell>
           
            </TableRow>
          ))}
        </TableBody>
      </Table>   
       <div className="row mt-1 containerMessage">
        <div className="col-12">
        <div className="thankYouBox">
        <div><h5 className="borderText" > הודעה </h5>
        </div>
        <div className="thankYouText" dangerouslySetInnerHTML={{ __html: props.singleMessage.MessageText_Txt+props.singleMessage.InternalMessage_txt+ props.singleMessage.ExtraMessage_Vch}}>
        
        </div>

      </div>
      

        </div>
      </div>
      <CustModal content={messageforModal}/>
    </TableContainer>

  

    
   
    <TableContainer className="container h" sx={{ my: "10px",  marginLeft: 'auto', marginright: 'auto'}} component={Paper}>

      <div className="row frameUrgent borderUrgent" >
    
        <div className="col-12" >
          {/* <iframe src="http://10.0.0.115/CustomerWebDoc/2147/2147.htm" */}
          {/* <iframe src={props.singleMessage.urgentlines}
           height="300px" width="100%" /> */}
  
          {props.singleMessage.urgentlines.includes('.htm')||props.singleMessage.urgentlines.includes('.html')||props.singleMessage.urgentlines.includes('.mht')||props.singleMessage.urgentlines.includes('.mhtml')?<iframe src={props.singleMessage.urgentlines} height="300px" width="100%" /> :<div  dangerouslySetInnerHTML={{ __html: props.singleMessage.urgentlines}}></div>}
           
        </div>
      </div>
      <div className="col-12">
      {props.singleMessage.urgentlines.includes('.htm')||props.singleMessage.urgentlines.includes('.html')||props.singleMessage.urgentlines.includes('.mht')||props.singleMessage.urgentlines.includes('.mhtml')?<CustModal content={iframeforModal}/>:''}
      </div>
      <div className="separator">
        
      </div>
      </TableContainer>
      
      <Footeracmash/>
     
      </div>
           
  );
}
export default connect(
  (state)=>({
    singleMessage:state.singleMessage.singleMessage,
    index:state.singleMessage.index,
    messages:state.messages.messages,
    chatHubProxy:state.hub.chatHubProxy
  }),
  {
    setSingleMessage,
    setIndex,
    invokeHubProxyRowUpdated,
 
  }
)(UrgentMessageChild) ;
