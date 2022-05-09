import React, { useEffect ,useState} from "react";
import '../../css/common.css'
import KishuritLogo from '../common/KishuritLogo'
import { setSingleMessage,setIndex } from "../../redux/actions/urgentMessageChild.action";
import {connect} from 'react-redux' ;//כך מחברים את הקומפוננטה לstate
import { useNavigate ,useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import CustModal from "../common/Modal";
import UrgentTreatModal from './UrgentTreatModal'
import AutomaticSmsModal from './AutomaticSmsModal'
import AutomaticWhatsAppModal from './AutomaticWhatsAppModal'
import distributionService from '../../services/distribution.service'
import {invokeHubProxyRowUpdated} from "../../redux/actions/hubConnection.action"
import Kish_light_Logo from '../../img/logoLight.jpg';
 function UrgentMessageChild(props)
{
  let navigate = useNavigate();
  
  //const { state } = useLocation();
  const [iframeforModal,setiframeforModal]=useState('');
  const [messageforModal,setmessageforModal]=useState('');

   useEffect(() => {

    const init =  () => {
      setiframeforModal('<iframe height="100%" width="100%"  src='+props.singleMessage.urgentlines+ ' />');
      setmessageforModal(props.singleMessage.MessageText_Txt+props.singleMessage.InternalMessage_txt+ props.singleMessage.ExtraMessage_Vch);
    }
  
    init()
   
  }, [props.singleMessage])

   
  const exitMessageChild=()=>{
    let path = '/UrgetTable';
    navigate(path);
  }
    const  prevMsg=()=>{
    let index=props.index-1;
    if(index>=0){
      props.setIndex(index);
      props.setSingleMessage(props.messages[index]);
    }
  }
  const nextMsg=()=>{
    let index=props.index+1;
    if(index<props.messages.length){
      props.setIndex(index);
      props.setSingleMessage(props.messages[index]);
    }
    else{

    }
    
   }
 async function noRelevant(){
 
  let result= await distributionService.saveDistribution({"isTreat":1,"isConnection":3,"messageCode":props.singleMessage.MessageCode_Vch,"disributionDetails":null,"notConnectionReason":"לא רלונטי","timer":0})
   
      if(result.iserror) {
       alert(result.data );
      }
      else{
        props.invokeHubProxyRowUpdated( props.singleMessage.MessageCode_Vch);
      }
// let path = '/';
//     navigate(path);
navigate(-1);

}

  return (
    <div dir="rtl" className="container h">
      {/* <KishuritLogo/> */}
      <div  style={{marginBottom: '30px',marginTop: '5px', borderBottomWidth: 2, borderBottomColor: '#6bc0b2'}}>
         <img src={Kish_light_Logo} alt="logo" width="210" />
         </div>
      <div name="labels">
          <div className="row mt-2">
          <div className="col-4">
              <h5>שם מנוי:</h5>
              <p>{props.singleMessage.ClientName_Vch}</p>
            </div>
            <div className="col-4">
              <h5>מספר מנוי:</h5>
              <p>{props.singleMessage.ClientNo_Int}</p>
            </div>
            <div className="col-4">
              <h5> קוד הודעה:</h5>
              <p>{props.singleMessage.MessageCodeCust}</p>
            </div>
          </div>
          <div className="row mt-1">
          <div className="col-4">
              <h5> תאריך:</h5>
              <p>{format(new Date(props.singleMessage.OpeningDate_Dat),'dd/MM/yyyy HH:mm:ss')}</p>
            </div>
            <div className="col-4">
              <h5>מוקדן:</h5>
              <p>{props.singleMessage.EmployeName_Int}</p>
            </div>
            <div className="col-4">
              <h5>מטפל בדחוף:</h5>
              <p>{props.singleMessage.urgentTreatName}</p>
            </div>
          
          
          
          
          </div>
      </div> 
      <CustModal content={messageforModal}/>
      <div className="row mt-1 containerMessage">
     
        <div className="col-12">
        
      
   
        <div className="thankYouBox">
        <h5 className="borderText"> הודעה </h5>
        <div className="thankYouText" dangerouslySetInnerHTML={{ __html: props.singleMessage.MessageText_Txt+props.singleMessage.InternalMessage_txt+ props.singleMessage.ExtraMessage_Vch}}>
        
        
        </div>
      </div>
         
        </div>
      </div>
      <div className="separator"></div>
      <div className="row frameUrgent borderUrgent">
       
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
      <div className="separator"></div>
      
      
      <div className="row  footer ">
        <div className="col-6 wrapperfooter" >
          <button className="btn bluebtn big" onClick={nextMsg.bind(this)}  >הודעה הבאה</button>
          <button className="btn bluebtn big" onClick={prevMsg.bind(this)} >הודעה קודמת</button>
          {/* <UrgentTreatModal messagecode={props.singleMessage.MessageCode_Vch}/> */}
          <UrgentTreatModal />
          <AutomaticSmsModal/>
         <AutomaticWhatsAppModal/>
      
          
        </div>
        <div className="col-3">
        <button className="btn bluebtn big"  onClick={noRelevant.bind(this)}>לא רלונטי</button>
        </div>
        <div className="col-3">
          <button className="btn bluebtn big"  onClick={exitMessageChild.bind(this)}>יציאה</button>
          
        </div>

      </div>
      <div className="separator"></div>
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
