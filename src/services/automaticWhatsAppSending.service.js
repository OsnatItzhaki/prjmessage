import axios from   "axios";
const HOST_API = process.env.REACT_APP_HOST_API_KEY || '';
class automaticWhatsAppSendingService{

    async  fetchListWhatsAppForAutomaticSend(clientCode){
    console.log("fetchListSmsForAutomaticSend service");
    const cancelTokenSource = axios.CancelToken.source();
    
     const data= await  axios.get(`${HOST_API}/api/AutomaticWhatsAppSending/Get`,{
      //const data= await  axios.get('/WS_Local_Kishurit/api/AutomaticWhatsAppSending/Get',{
        params: {
            clientCode:clientCode 
        }, cancelToken: cancelTokenSource.token
        })
        .then(({data})=>data)

    cancelTokenSource.cancel();
    return await data;

        }
    async insertMultipleAutomaticSending(object)
        {
            let responseObj={iserror:false,data:""}
            const tracking = await axios({
                method: 'post',
                url: `${HOST_API}/api/AutomaticWhatsAppSending/post`,
                headers: {'Content-Type': 'application/json'},
                       
                data: JSON.stringify(object)  ,// This is the body part
                
              }).then(function(response) {
                responseObj={iserror:false,data:response.data}
            }).catch(function (error) {
              alert("error in automaticWhatsAppSendingService_insertMultipleAutomaticSending:"+error.response.data.ExceptionMessage);
              if (error.response) {
                // Request made and server responded
                responseObj={iserror:true,data:"data:"+error.response.data.ExceptionMessage+",status:"+error.response.status}
                
              }
            
              });
              return  responseObj ;

        }
    }
    export default new automaticWhatsAppSendingService();