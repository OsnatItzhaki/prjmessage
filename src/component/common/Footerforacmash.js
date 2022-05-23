import * as React from 'react';

import '../../css/common.css';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate ,useLocation } from 'react-router-dom';
import UrgentTreatModal from '../AchmashUrgent/UrgentTreatModal';
import Paper from '@mui/material/Paper';
import {connect} from 'react-redux';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import distributionService from '../../services/distribution.service';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AutomaticSmsModal from '../AchmashUrgent/AutomaticSmsModal';
import AutomaticWhatsAppModal from '../AchmashUrgent/AutomaticWhatsAppModal';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { setIndex,setSingleMessage } from '../../redux/actions/urgentMessageChild.action';
import Element from '../../img/element.png'


 


var style = {
    backgroundColor: "black",
    
    borderTop: "3px solid #e0871b",
    
    textAlign: "center",
    padding: "0.5%",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "8%",
    width: "100%",
}

var acmash = {
  display: 'block',
  padding: '0.5%',
  height: '8%',
  width: '100%',
}



function Footeracmash(props ) {
    let navigate = useNavigate();
    
    const exitMessageChild=()=>{
        let path = '/UrgetTable';
        navigate(path);
      }
      
      const Item = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: 'center'
      }))
      
      const nextMsg=()=>{
        let index=props.index+1;
        if(index<props.messages.length){
          props.setIndex(index);
          props.setSingleMessage(props.messages[index]);
        }
        else{
    
        }
        
       }
       
       const  prevMsg=()=>{
        let index=props.index-1;
        if(index>=0){
          props.setIndex(index);
          props.setSingleMessage(props.messages[index]);
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
        <div sx={{backgroundImage: `url(${Element})`,backgroundPosition: ('center center'),backgroundRepeat: ('no-repeat'), backgroundsize: 'cover', backgroundSize:'contain'}} >   
            <div style={acmash} />
            <div style={style}>

         <ButtonGroup disableElevation variant="contained" sx={{pb:3}}>
         <Button onClick={nextMsg.bind(this)}  variant="contained" sx={{backgroundColor:'#aac22f','&:hover': {backgroundColor: '#e0871b',color: '#fff'}}}  endIcon={<ArrowForwardIosIcon />}>הודעה הבאה</Button>
         <Button onClick={prevMsg.bind(this)} variant="contained" sx={{backgroundColor:'#aac22f','&:hover': {backgroundColor: '#e0871b',color: '#fff'}}} endIcon={<ArrowBackIosIcon />}> הודעה קודמת</Button>
         </ButtonGroup>

          <Button> <AutomaticSmsModal /></Button>
         
          <Button> <AutomaticWhatsAppModal /></Button>
          
          <Button  variant="contained" onClick={noRelevant.bind(this)} endIcon={<DeleteIcon />} sx={{backgroundColor:'#6bc0b2','&:hover': {backgroundColor: '#e0871b',color: '#fff'}}}>לא רלוונטי</Button>
        
          <Button> <UrgentTreatModal  /></Button>

      
          <Button  variant="contained"  onClick={exitMessageChild.bind(this)} endIcon={<LogoutIcon />} sx={{backgroundColor:'#aac22f','&:hover': {backgroundColor: '#e0871b',color: '#fff'}}}> יציאה</Button>
         
            </div>
            </div>

    )}



export default connect(
    (state)=>({
      singleMessage:state.singleMessage.singleMessage,
      index:state.singleMessage.index,
      messages:state.messages.messages,
      chatHubProxy:state.hub.chatHubProxy
    }),
    {
        setSingleMessage,
        setIndex
    }
  )(Footeracmash) ;
  
  
                                     


