import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Select from "@mui/material/Select";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useState,useEffect } from 'react'

import {connect} from 'react-redux' ;
import {fetchDistributionType} from '../../redux/actions/distribution.action'
import MenuItem from '@mui/material/MenuItem';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function DistributionTreatDetail(props) {
    // const [distribution, setDistribution] = useState(0);
    // const [selectValue, setSelectValue] = useState(0);
    // const [textValue, setTextValue] = useState('');
    const [statevalues,setStatevalues]=useState({selectValue:0,textValue:''})

    const handleChange = e => {
     
      const { name, value } = e.target;
      
      setStatevalues(prevState => ({
          ...prevState,
          [name]: value
      }));


      props.onDistributionChange(statevalues,props.i)
      
    
  };
  const handleClose = e => {
   
    //.props.onDistributionChange(statevalues,props.i)
    
};
  const handleChangeSelect = e => {
     
    const { name, value } = e.target;
 
    let object = {...statevalues};

      object.selectValue = value;
    
      setStatevalues(object);
      setStatevalues(object);
    // setStatevalues(prevState => ({
    //     ...prevState,
    //     selectValue: value
    // }));
   
console.log(statevalues);//משום מה זה לא משתנה לכן מעבירה את האוביקט
    props.onDistributionChange(object,props.i)
    
};


useEffect(() => {

    const init =  () => {
     
      props.fetchDistributionType();
    
      setStatevalues({...statevalues,  selectValue: props.value,textValue: props.detail})
     
      
      // props.detail!==undefined?setState({...state,  textValue: props.detail}):setState({...state,  textValue: ''});
      // props.value!==undefined?setState({...state,  selectValue: props.value}):setState({...state,  selectValue: 0});
    }
  
    init()
   
  }, [])
  return (
   
      <div dir="rtl">
    <Box key={props.key} sx={{ '& .MuiTextField-root': { m: 1 } }} >
      <Grid container spacing={2}>
        <Grid item xs={4}>
         
          <TextField
          // id="outlined-select-currency-native"
          fullWidth 
          select
          name="selectValue"
          label="אמצעי הפצה"
          //value={statevalues.selectValue}//{props.value}
          SelectProps={{
            value: statevalues.selectValue,
            onChange: handleChangeSelect,
            // MenuProps: {
            // //  className: 'vnf-designer-value',
            //   //getContentAnchorEl: null,
            //   anchorOrigin: {
            //      vertical: 'bottom',
            //      // horizontal: 'center',
            //   }
          // },
          }}
          >
          {props.distributionType.map((option) => (
            <MenuItem key={option.distributionCode} value={option.distributionCode} >
              {option.distributionValue}
            </MenuItem>
          ))}
         
        
        {/* <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">אמצעי הפצה</InputLabel>
        <Select
        
        labelId="demo-simple-select-label"
        label="אמצעי הפצה"
        value={statevalues.selectValue}
        onChange={handleChangeSelect}
        onClose={handleClose}
      >
            {props.distributionType.map((option) => (
            <MenuItem key={option.distributionCode} value={option.distributionCode} >
              {option.distributionValue}
            </MenuItem>
          ))}
         </Select>
         </FormControl> */}
        </TextField>
          
        </Grid>
        <Grid item xs={8}>
         
          <TextField
        id="input-with-icon-textfield"
        label="פירוט"
        fullWidth
        name="textValue"
        onChange={handleChange}//{props.onDistributionChange }
        onKeyUp={handleChange}
        value={statevalues.textValue}//{props.detail}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EditIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
          
        </Grid>
      
      </Grid>
    </Box>
    </div>
  
  );
  
}
export default connect(
    (state)=>({
      distributionType:state.distribution.distributionTypes
    }),
    {
        fetchDistributionType
    }
  )(DistributionTreatDetail) ;