import * as React from 'react';
import MyStopwatch from "../common/Clock"
import { useStopwatch } from 'react-timer-hook';
import { fetchTreatDistribution } from "../../redux/actions/distribution.action";
import distributionService from '../../services/distribution.service'
import { setSingleMessage } from "../../redux/actions/urgentMessageChild.action";
import {invokeHubProxyRowUpdated} from "../../redux/actions/hubConnection.action"
import { setMessages } from "../../redux/actions/mainUrgentTable.action";
import {connect} from 'react-redux' ;
import ConfirmDialog from "../common/ConfirmDialog"
import AlertMessage from "../common/AlertMessage"
import Box from '@mui/material/Box';
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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


 function UrgentTreatModal(props) {
  const [alertMessage, setAlertMessage] = useState({ isOpen: false, status: "info", msg: "" })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  const [open, setOpen] = useState(false);
  const handleOpen = () => {init();
  setOpen(true);}
  const handleClose = () => setOpen(false);
  const [data,setData] = useState([{id:0,distributionCode:0,detail:'',isDelete:false}]);
  const [reasonNotConnection, setReasonNotConnection] = useState(''); 
  const [switchState, setSwitchState] = useState({
    treat: props.singleMessage.Handled_Bit,
    connection: props.singleMessage.ConectionMade_Int===1?true:false
  });
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });

//   const handleChangeText = e => {
//     const { name, value } = e.target;
//     setReasonNotConnection(prevState => ({
//         ...prevState,
//         [name]: value
//     }));
    
// };
const deleteAllDistributionItems=(event)=>{
  data
  .filter(elem => elem.isDelete===false)
  .map((elem) => (
  
   deleteitem(data.indexOf(elem)))
  )
  let object = {...switchState};

  object.connection = false;

  setSwitchState(object);
    

}
  const handleChange = (event) => {
   
    if(event.target.name==="connection" && event.target.checked===false )
    {
      let index = data.findIndex(distribution => distribution.distributionCode !=  0); 
      if (index>-1)
      {
        setConfirmDialog({
          isOpen: true,
          title: 'האם אתה בטוח שברצונך למחוק?',
          subTitle: "פעולה זו תמחוק את אמצעי ההפצה שהוזנו להודעה(רק בשמירה)",
          onConfirm: () => { 
            setSwitchState({
              ...switchState,
              [event.target.name]: event.target.checked,
            });
            deleteAllDistributionItems(event)} });
      return;
      }

    }
  
    setSwitchState({
      ...switchState,
      [event.target.name]: event.target.checked,
    });
  };
  const handleChangeText = (event) => {
    setReasonNotConnection(event.target.value);
  };
 const HasDistribution=()=>{
   let Isdistribution=false;
   data
    .map((elem) => (
      Isdistribution=elem.isDelete||elem.distributionCode===0?Isdistribution:true
    ));
  
    return Isdistribution
 }
  const save = () => {
    let timer=minutes*60+seconds;
    let isTreat=switchState.treat;
    let isConnection=switchState.connection;
    let messageCode=props.singleMessage.MessageCode_Vch;
    let disributionDetails=data;
    let notConnectionReason=reasonNotConnection
    let validDist=isConnection?HasDistribution():true;
    if(validDist===false)
    {
      setAlertMessage({
        isOpen: true,
        status: "error",
        msg: "נוצר קשר, אך אין פירוט אמצעי הפצה"
    });
    return;

    }
    isConnection=isConnection?1:2;
    let jsond=distributionService.saveDistribution({"userCode":props.user.userCode,"isTreat":isTreat,"isConnection":isConnection,"messageCode":messageCode,"disributionDetails":disributionDetails,"notConnectionReason":notConnectionReason,"timer":timer})
    jsond.then(function(result) {
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
          msg: "השמירה בוצעה בהצלחה"        
      });
      
      props.setSingleMessage(result.data);
      props.invokeHubProxyRowUpdated(props.singleMessage.MessageCode_Vch);
      //handleClose();

      }
   })
  };
  const onDistributionChange=(state,i)=>{
 
    let items = [...data];
    let item = {...items[i]};
    item.detail = state.textValue;
    item.distributionCode=state.selectValue;
    items[i] = item;
    setData(items);
  }
  const addrow = () => {
    let len=data.length;
    setData(prevArray => [...prevArray, {id:len,distributionCode:0,detail:'',isDelete:false}])
  };
 
  const deleteitem = (i) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
  })
     
    let items = [...data];
    // 2. Make a shallow copy of the item you want to mutate
    let item = {...items[i]};
    // 3. Replace the property you're intested in
    item.isDelete = true;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    items[i] = item;
    // 5. Set the state to our new copy
    setData(items);
   //setData(data[i].isDelete=true);
   //setData(data.filter((item) => item.isDelete.includes(e.target.value))
  };
  
  async function init  () {
    
    await props.fetchTreatDistribution(props.singleMessage.MessageCode_Vch);
    setData(props.treatDistribution)
    setSwitchState({
      treat: props.singleMessage.Handled_Bit,
      connection: props.singleMessage.ConectionMade_Int===1?true:false
    })
    start();
    
    
  
  }
  
  useEffect(() => {
    setData(props.treatDistribution)
  }, [props.treatDistribution])
  
  return (
      <div>
         <button className="btn bluebtn big" onClick={handleOpen}  > טיפול בדחוף</button>
           {/* <Button onClick={handleOpen}>טיפול בדחוף</Button> */}
       <Modal
        open={open}
        onClose={handleClose}
      
      >
        <>
      
        <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
    <AlertMessage
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
            />
        <Box dir="rtl" sx={style}>
        <Grid  container spacing={2} key="11">
             <Grid dir="ltr" item xs={12} >
              <div>
             <IconButton onClick={save} aria-label="save" size="large">
              <SaveIcon fontSize="inherit"/>
             </IconButton>
             </div>

             </Grid>
          <Grid item xs={8}>
            <FormControlLabel
            control={
                <Switch checked={switchState && switchState.connection} onChange={handleChange} name="connection" />
            }
            label="האם נוצר קשר?" 
            />
            </Grid>
             <Grid item xs={4} key="13">
            <FormControlLabel
            control={
                <Switch checked={switchState && switchState.treat} onChange={handleChange} name="treat" />
            }
            label="סיום טיפול"
            />
           
            </Grid>
            </Grid>
        <div>
       
          { data
          .filter(elem => elem.isDelete===false)
          .map((elem) => (
          
         
           <Grid  
           container
           spacing={2}
           key={'treatGrid'+data.indexOf(elem)}
         >
      <Grid item xs={10} key={'treatComponent'+data.indexOf(elem)}>
    
      <DistributionTreatDetail onDistributionChange={onDistributionChange} key={data.indexOf(elem)} i={data.indexOf(elem)} id="distribution-treat-detail-`${i}`" value={elem.distributionCode} detail={elem.detail}/> 
      </Grid> 
       <Grid item xs={2} key={'delete'+data.indexOf(elem)}>
         <div>
       <IconButton key={data.indexOf(elem)} aria-label="save" size="large" onClick={() => {
          
                setConfirmDialog({
                  isOpen: true,
                  title: 'האם אתה בטוח שברצונך למחוק?',
                  subTitle: "לא תוכל לבטל את הפעולה",
                  onConfirm: () => { deleteitem(data.indexOf(elem)) }
              })}
          }>
               <DeleteForeverIcon fontSize="inherit" style={{ color: '#D22B2B' }}/>
              </IconButton>
              </div>
        </Grid>
        </Grid>
           
           
         
      
    ))}
    </div>
    <div>
    <IconButton onClick={addrow}  aria-label="add" size='small' >
               <AddIcon  fontSize="large" />
              </IconButton>
      <label>הוסף אמצעי הפצה</label>
     
    </div>
    
    <Grid container >
          <Grid item xs={12} >
          <TextField defaultValue={props.singleMessage.NoConectionReason_Vch} disabled={switchState.connection} multiline rows={2} fullWidth label="סיבה לאי יצירת קשר" name="reasonNotConnection" onChange={handleChangeText}/>
          </Grid>
          </Grid>
         
    </Box>
    
    
    
    </></Modal>
          </div>

    
     
   
   
  );
}
export default connect(
    (state)=>({
        singleMessage:state.singleMessage.singleMessage,
        treatDistribution:state.distribution.treatDistribution,
        chatHubProxy:state.hub.chatHubProxy,
        user:state.user.user
    }),
    {
      fetchTreatDistribution,
      setMessages,
      setSingleMessage,
      invokeHubProxyRowUpdated,
   
    }
  )(UrgentTreatModal) ;