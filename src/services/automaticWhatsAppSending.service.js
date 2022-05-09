import axios from   "axios";
class automaticWhatsAppSendingService{

    async  fetchListWhatsAppForAutomaticSend(clientCode){
    console.log("fetchListSmsForAutomaticSend service");
    const cancelTokenSource = axios.CancelToken.source();
    
     const data= await  axios.get('http://localhost:57143/api/AutomaticWhatsAppSending/Get',{
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
                url: 'http://localhost:57143/api/AutomaticWhatsAppSending/post',
                headers: {'Content-Type': 'application/json'},
                       
                data: JSON.stringify(object)  ,// This is the body part
                
              }).then(function(response) {
                responseObj={iserror:false,data:response.data}
            }).catch(function (error) {
                if (error.response) {
                  // Request made and server responded
                  responseObj={iserror:true,data:"data:"+error.response.data+",status:"+error.response.status+",headers:"+error.response.headers}
                  return responseObj;
                } else if (error.request) {
                  // The request was made but no response was received
                  responseObj={iserror:true,data:error.request}
                  return responseObj;
                } else {
                  // Something happened in setting up the request that triggered an Error
                  responseObj={iserror:true,data:error.message}
                  return responseObj;
                }
            
              });
              return  responseObj ;

        }
    }
    export default new automaticWhatsAppSendingService();