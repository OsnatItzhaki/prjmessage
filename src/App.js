import * as React from 'react';
import './App.css';
import UrgetTable from  './component/AchmashUrgent/AchmashMainUrgentTbl'
import UrgentMessageChild from './component/AchmashUrgent/AchmashMessageChild'
import UrgentTreatModal from './component/AchmashUrgent/UrgentTreatModal'
import { useState,useEffect} from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useHistory ,BrowserRouter,Routes,Redirect,Route,Navigate} from 'react-router-dom';
import Login from './component/AchmashUrgent/Login';
import {connect} from 'react-redux' ;
const theme = createTheme({
    direction: 'rtl', // Both here and <body dir="rtl">
  });
  // Create rtl cache
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });
 


function App(props) {
  const [isUrgentTable,setIsUrgentTable]= useState(true);
  const [isLoggedIn,setIsLoggedIn]= useState(false);

  const removeElementUrgentTable=(()=>{

    setIsUrgentTable(false);
    //history.push('/main');

  })
  useEffect(() => {

  if ( Object.keys(props.user).length == 0) {
    setIsLoggedIn(false);

  }else{
    setIsLoggedIn(true);
  }
},[props.user])
  return (
   
    <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={theme}>
    <div  dir="rtl" className="App">
      
       
       <BrowserRouter>
      
        <Routes>
          {!isLoggedIn &&(
             <Route  path="/" element={<Login/>}/>
          )}
        {/* <PrivateRoute path="/UrgetTable" component={UrgetTable} /> */}
        {isLoggedIn &&(
          <>
          <Route  path="/UrgetTable" element={<UrgetTable/>}>
          </Route>
          {/* <Route  path="/" element={<Login/>}>
          </Route> */}
          <Route  path="/UrgentMessageChild" element={<UrgentMessageChild/>}>
          </Route>
          <Route  path="/UrgentTreatModal" element={<UrgentTreatModal/>}>
          </Route>
          </>
        )}
        
         <Route  path="*" element={<Navigate to={isLoggedIn ? "/UrgetTable":"/"}/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
    </ThemeProvider>
    </CacheProvider>

  );
}

export default connect(
  (state)=>({
    user:state.user.user,
  }),
  {

  }
)(App) ;
