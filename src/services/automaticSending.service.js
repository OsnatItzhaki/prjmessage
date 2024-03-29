import axios from   "axios";
const HOST_API = process.env.REACT_APP_HOST_API_KEY || '';
class automaticSendingService{

    async  fetchListSmsForAutomaticSend(clientCode){
    
    const cancelTokenSource = axios.CancelToken.source();

    const data= await  axios.get(`${HOST_API}/api/AutomaticSending/Get`,{
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
                url: `${HOST_API}/api/AutomaticSending/post`,
                headers: {'Content-Type': 'application/json'},
                       
                data: JSON.stringify(object)  ,// This is the body part
                
              }).then(function(response) {
                responseObj={iserror:false,data:response.data}
            }).catch(function (error) {
              //alert("error in automaticSendingService_insertMultipleAutomaticSending:"+error.response.data.ExceptionMessage);
              if((error.response.data.ExceptionMessage).includes('duplicate key'))
              {
                alert("לא ניתן לבחור את אותו נייד פעמיים מהרשימה, יש להקליד מספר נייד בתיבת נייד חופשי");
              }
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
    export default new automaticSendingService();