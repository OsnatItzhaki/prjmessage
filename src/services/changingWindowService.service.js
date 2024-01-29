import axios from   "axios";
const HOST_API = process.env.REACT_APP_HOST_API_KEY || '';
class changingWindowService{

    async  fetchClientList(){
    console.log("fetchClientList service");
    const cancelTokenSource = axios.CancelToken.source();
    
     const data= await  axios.get(`${HOST_API}/api/ChangingWindow/`,{

          cancelToken: cancelTokenSource.token
        })
        .then(({data})=>data)

    cancelTokenSource.cancel();
    return await data;
}

async  fetchData(clientNo,isurgent){
    console.log("fetchData service");
    const cancelTokenSource = axios.CancelToken.source();
    
     const data= await  axios.get(`${HOST_API}/api/ChangingWindow/`,{
     
        params: {
            clientNo:clientNo,
            isurgent:isurgent
        }, cancelToken: cancelTokenSource.token
        })
        .then(({data})=>data)

    cancelTokenSource.cancel();
    return await data;
}
async saveData(saveObject)
{
    let responseObj={iserror:false,data:""}
    const tracking = await axios({
        method: 'post',
        url: `${HOST_API}/api/ChangingWindow/`,
        headers: {'Content-Type': 'application/json'},
               
        data: JSON.stringify(saveObject)
        
      }).then(function(response) {
        responseObj={iserror:false,data:response.data}
        
    }).catch(function (error) {
        alert("שימו לב, קיימת הודעה משתנה למנוי זה");
        if (error.response) {
          // Request made and server responded
          responseObj={iserror:true,data:"data:"+error.response.data.ExceptionMessage+",status:"+error.response.status}
          
        }})
        return responseObj;
}
    
}
    export default new changingWindowService();