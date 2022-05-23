import * as React from 'react';
import K1 from '../../img/k1.png';
import K2 from '../../img/k2.png';
import K3 from '../../img/k3.png';
import K4 from '../../img/k4.png';
import '../../css/common.css'



var style = {
    backgroundColor: "black",
    //borderTop: "3px solid transparent",
    borderTop:'3px solid #e0871b',
   borderBottom:'3px solid #6bc0b2',
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "80px",
    width: "100%",
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
}

function Footer1( ) {
    return (
        <div >
            <div style={phantom} />
            <div style={style}>
        
 
   <div class="container" >
  <div class="row justify-content-md-center">
    <div class="col col-sm-2">
    <a href="" style={{pb:'10px'}}><img src={K1} /></a>    </div>
    <div class="col-sm-2">
    <a href="" style={{pb:'10px'}}><img src={K2} /></a>
    </div>
    <div class="col col-sm-2">
    <a href="" style={{pb:'10px'}}><img src={K3} /></a>  
    </div>
    <div class="col col-sm-2">
    <a href="" style={{pb:'10px'}}><img src={K4} /></a>
    </div>
  </div>
  <div class="footer-top-border color1"> </div>
	<div class="footer-top-border color2"> </div>
	<div class="footer-top-border color3"> </div>
	<div class="footer-top-border color4"> </div>
	<div class="footer-top-border color5"> </div>	 
	<div class="footer-top-border color6"> </div>

  </div>
  </div>
  
 </div>
     
    )
}

export default Footer1
  
                                     


