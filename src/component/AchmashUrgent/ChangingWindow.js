import * as React from 'react';
import '../../css/common.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {connect} from 'react-redux' ;
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Switch from '@mui/material/Switch';
import ChangingWindowService from '../../services/changingWindowService.service'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import AlertMessage from "../common/AlertMessage"
import {useState,useEffect} from 'react'
import { format } from 'date-fns';


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
      const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};
      
      export default function ChangingWindow(props)
      {
        const [openModal, setOpenModal] = React.useState(false);
        const [clientName, setClientName] = React.useState('');
        const [clientList, setClientList] = React.useState([]);
        const [clientNo, setClientNo] = React.useState('');
        const [alertMessage, setAlertMessage] = useState({ isOpen: false, status: "info", msg: "" })
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
        const [data, setData] = React.useState({
          clientNo:0,
            fromDate: new Date().toLocaleString(), 
            toDate: new Date().toLocaleString(),
            isDisplay:false,
            content:"",
            isurgent:props.isurgent ?? false

          });
          const [dataTable,setDataTable]= React.useState([{
            fromDate: new Date(),// format(new Date(),'dd/MM/yyyy'),
            toDate: new Date(),// format(new Date(),'dd/MM/yyyy'),
            content:""
            

          }]);
          async function save (){
            console.log("save",data);
            const result=await ChangingWindowService.saveData(data)
            
            
              // if(result.iserror) {
              //   setAlertMessage({
              //     isOpen: true,
              //     status: "error",
              //     msg: 'קיימת הודעה משתנה עם אותם נתונים או שמספר מנוי שהוזן אינו תקין' 
              // });
               
              // }
              // else{
               
                setAlertMessage({
                  isOpen: true,
                  status: "success",
                  msg: "השמירה בוצעה בהצלחה"
              });
            // }
          }
          
        
      

        const changeData=(event)=>{
          
            setData({
                ...data,
                [event.target.name]: event.target.value,
              });
        }
        const changeDataChecked=(event)=>{
          
            setData({
                ...data,
                [event.target.name]: event.target.checked,
              });
        }
        
        const handleOpenModal = () => {setOpenModal(true);}
        const handleCloseModal = () => {setOpenModal(false)};
        const getChangeWindows=()=>{
            getData();
        }
       
        const handleChangeClientName = (e) => {
          
          setClientNo(e.target.value);
            setData({...data, clientNo: e.target.value});
           setClientName(e.target.value);
           
          };
          const handleChangeClientNo = (e) => {
            console.log('wwww',e);
            setData({...data, clientNo: e.target.value})
            setClientNo(e.target.value);
           setClientName('');
           
          };
         
          React.useEffect(() => {

            async function init  () {
             
              const Data=await ChangingWindowService.fetchClientList();
              console.log(Data);
              
              setClientList(Data);
              
            }
          console.log("init","initchangingwindows")
            init()
           
          }, [])
          useEffect(() => {

            console.log("data",data);
           
          }, [data])
          useEffect(() => {

            console.log("dataTable",dataTable);
           
          }, [dataTable])
          async function getData  () {
             
            const Data=await ChangingWindowService.fetchData(clientNo,props.isurgent);
            setData({clientNo,fromDate:Data.fromDate,toDate:Data.toDate,isDisplay:Data.isDisplay,content:Data.conten,isurgent:props.isurgent})
            setDataTable(Data.ChangingWindowsDataGridList)
            console.log(Data);
          }
          
        return (
          <div>
            <AlertMessage
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
            />
            {props.isurgent===true?<Button isurgent={props.isurgent} onClick={handleOpenModal}>הודעה משתנה דחופה</Button>:<Button isurgent={props.isurgent} onClick={handleOpenModal}>הודעה משתנה</Button>}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
                 <div dir="rtl">
        <Box sx={style}>
        <Grid container spacing={2}>
        <Grid item xs={2}>
        <TextField
          id="standard-search"
          label="מס' מנוי"
          variant="standard"
          onChange={handleChangeClientNo}
          value={clientNo}
        />
  </Grid>
  <Grid item xs={8}>
  <FormControl fullWidth>
         <InputLabel id="demo-simple-select-label">שם מנוי</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={clientName}
          label="שם מנוי"
           onInput={handleChangeClientName}
          MenuProps={MenuProps}
        >
            {
                clientList.map((row,index)=>(

                <MenuItem key={index} value={row.ClientNo}>{row.clientName}</MenuItem>
            ))
            } 
          
          
        </Select>
        </FormControl>
  </Grid>
  <Grid item xs={1}>
  <IconButton onClick={getChangeWindows} aria-label="search" size="large">
              <SearchIcon fontSize="inherit"/>
             </IconButton>
  
  </Grid>
  <Grid item xs={1}>
  <IconButton onClick={save} aria-label="save" size="large">
              <SaveIcon fontSize="inherit"/>
             </IconButton>
  </Grid>
  <Grid item xs={12}>
  <TextField variant="standard"
          id="outlined-multiline-flexible"
          label="הודעה משתנה"
          multiline
          fullWidth
          maxRows={4}
          autoFocus
           minRows={4}
          value={data.content}
          onChange={changeData}
          name="content"/>
        </Grid>
        <Grid item xs={4}>
      
      <DatePicker
      inputFormat='dd/MM/yyyy'
        label="מתאריך"
        value={data.fromDate}
        key="fromDate"
        onChange={(newvalue) => {
            setData({
                ...data,
                fromDate: newvalue,
              });
          }}
        renderInput={(params) => <TextField {...params} />}
      />
    
    </Grid>
    <Grid item xs={4}>
      
      <DatePicker
      inputFormat='dd/MM/yyyy'
        label="עד תאריך-יש לבחור יום אחד אחרי התאריך הרצוי"
        value={data.toDate}
        key="toDate"
        onChange={(newvalue) => {
            setData({
                ...data,
               toDate: newvalue,
              });
          }}
        renderInput={(params) => <TextField {...params} />}
      />
   
    
    </Grid>
    <Grid item xs={4}>
    <FormControlLabel
            control={
                <Switch checked={data.isDisplay} onChange={changeDataChecked} name="isDisplay" />
            }
            label="הצגת הודעה משתנה בחלון"
            />
  </Grid>
  <Grid item xs={12}>
  <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell align="center">בתוקף מ</TableCell>
            <TableCell align="center">בתוקף עד</TableCell>
            <TableCell align="left" >הודעה</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataTable.map((row,index) => (
            <TableRow
              key={index}
            >
              <TableCell align="center">
                { format(new Date(row.fromDate),'dd/MM/yyyy')}
              </TableCell>
              <TableCell align="center">{ format(new Date(row.toDate),'dd/MM/yyyy')}</TableCell>
              <TableCell align="left">{row.content}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
      </Grid>
  </Grid>
        </Box>
          </div>
            </Modal>
            </LocalizationProvider>
          </div>
        );
          }