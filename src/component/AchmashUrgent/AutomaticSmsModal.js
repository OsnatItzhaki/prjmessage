import * as React from 'react';
import { useStopwatch } from 'react-timer-hook';
import { fetchTreatDistribution } from "../../redux/actions/distribution.action";
import distributionService from '../../services/distribution.service'
import automaticSendingService from '../../services/automaticSending.service'
import { setSingleMessage } from "../../redux/actions/urgentMessageChild.action";
import {invokeHubProxyRowUpdated} from "../../redux/actions/hubConnection.action"
import {connect} from 'react-redux' ;
import AlertMessage from "../common/AlertMessage"
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Modal from '@mui/material/Modal';
import {useState,useEffect} from 'react'
import Switch from '@mui/material/Switch';
import DistributionTreatDetail from '../common/DistributionTreatDetail'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { useNavigate  } from 'react-router-dom';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


 function AutomaticSmsModal(props) {
  let navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState({ isOpen: false, status: "info", msg: "" })

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
//   const [data,setData] = useState([{phone:"",remark:""}]);
 const [data,setData] = useState([]);
  const [phoneSelected,setPhoneSelected]=useState([]);
  const [phoneText,setPhoneText]=useState("");

  const handleChangeText = (event) => {
      setPhoneSelected([]);
      const onlyNums = event.target.value.replace(/[^0-9]/g, '');
    setPhoneText(onlyNums);
  };
  

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPhoneText("");
    setPhoneSelected(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const sendMultiplePhone = () => {
      let messageCode =props.singleMessage.MessageCode_Vch
      let clientCode =props.singleMessage.ClientCode_Int
      let userCode=props.user.userCode
      let phonesDetail=phoneSelected.toString();
      let object={"isMultiple":1,"messageCode":messageCode,"clientCode":clientCode,"userCode":userCode,"phonesDetail":phonesDetail}
    let responseObj=automaticSendingService.insertMultipleAutomaticSending(object);
   
    responseObj.then(function(result) {
      if(result.iserror) {
        setAlertMessage({
          isOpen: true,
          status: "error",
          msg:  result.data 
      });
       
      }
      else{
       
        setAlertMessage({
          isOpen: true,
          status: "success",
          msg: "ההודעה תשלח ללקוח"        
      });
    }
    props.setSingleMessage(result.data);
    props.invokeHubProxyRowUpdated(props.singleMessage.MessageCode_Vch);
  })
}

  
  const sendPhoneText = () => {
    //קיים סיכוי קטן מאד שההודעה תשלח פעמיים לנייד האחרון שהזינו
    //וזאת כיון שמשנים את הערך של 419 לפני ששלחו את הראשון
    //הפתרון:לבדוק האם יש הפצה של 419 שלא נשלחה עדיין ולא היה שגיאה,אם קיים להקפיץ הודעה למשתמש
    let messageCode =props.singleMessage.MessageCode_Vch
    let clientCode =props.singleMessage.ClientCode_Int
    let userCode=props.user.userCode
    let phonesDetail=phoneText.toString();
    let object={"isMultiple":0,"messageCode":messageCode,"clientCode":clientCode,"userCode":userCode,"phonesDetail":phonesDetail}
    let responseObj=automaticSendingService.insertMultipleAutomaticSending(object);
 
     responseObj.then(function(result) {
      if(result.iserror) {
        setAlertMessage({
          isOpen: true,
          status: "error",
          msg:  result.data 
      });
     
    }
      else{
      
        setAlertMessage({
          isOpen: true,
          status: "success",
          msg: "ההודעה תשלח ללקוח"        
      });
  }
  props.invokeHubProxyRowUpdated(props.singleMessage.MessageCode_Vch);
  props.setSingleMessage(result.data);
  //navigate(path);
})
}
  const send = () => {
      if(phoneText!="")
          if(phoneText.length!=10)
            setAlertMessage({
                isOpen: true,
                status: "error",
                msg:  "נייד לא חוקי, מספר תווים שונה מ10" 
            });
          else
              sendPhoneText();
        else
            if(phoneSelected.length===0)
            setAlertMessage({
                isOpen: true,
                status: "warning",
                msg:  "לא נבחר נייד" 
            });
            else
            sendMultiplePhone();


  }
  useEffect(() => {

    async function init  () {
     
      const smsData=await automaticSendingService.fetchListSmsForAutomaticSend(props.singleMessage.ClientCode_Int);
    
      setData(smsData);

      
    
    }
  
    init()
   
  }, [props.singleMessage.ClientCode_Int])




  return (
      <div>
           <Button onClick={handleOpen}> משלוח אוטמטי</Button>
       <Modal
        open={open}
        onClose={handleClose}
      
      >
        <>
    <AlertMessage
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
            />
        <Box dir="rtl" sx={style}>
        <Grid  container spacing={2}  direction="column"
  alignItems="center"
  justifyContent="center" >
        <Grid item xs={12}>
            <h2>בחירת נייד למשלוח SMS</h2>
            </Grid>
            <Grid item xs={6}>
            <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">SMS</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={phoneSelected}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {data.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={phoneSelected.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

            </Grid>
            <Grid item xs={6}>
            <FormControl sx={{ m: 1, width: 300 }}>
            <TextField value={phoneText} onChange={handleChangeText} onKeyUp={handleChangeText}label="נייד חופשי" variant="outlined"></TextField>
            </FormControl>
            </Grid>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12}>
            </Grid>
            </Grid>

            <Grid  container spacing={7} justifyContent="center">
          <Grid item >
            <Button onClick={send} variant="outlined" size="large">
                שליחה
            </Button>
            </Grid>
             <Grid item  >
            <Button onClick={handleClose} variant="outlined" size="large">
                ביטול
            </Button>
           
            </Grid>
            </Grid>
        
       
          
    
    
         
    </Box>
    
    
    
    </></Modal>
          </div>

    
     
   
   
  )
  }

export default connect(
    (state)=>({
        singleMessage:state.singleMessage.singleMessage,
        user:state.user.user,
    }),
    {
    
      setSingleMessage,
      invokeHubProxyRowUpdated,
      
    }
  )(AutomaticSmsModal) ;