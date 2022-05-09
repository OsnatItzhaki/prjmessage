import axios from   "axios";
class loginService{
async loginUser(object)
        {
            let responseObj={iserror:false,data:""}
            const cancelTokenSource = axios.CancelToken.source();
            console.log(object);
            await axios({
                method: 'post',
                url: 'http://localhost:57143/api/Login/post',
                headers: {'Content-Type': 'application/json'},
                       
                data: JSON.stringify(object)  ,// This is the body part
                
              },{
                cancelToken: cancelTokenSource.token
               }).then(function(response) {
                 
                responseObj={iserror:false,data:response.data}
            }).catch(function (error) {
                if (error.response) {
                  // Request made and server responded
                  
                  responseObj={iserror:true,data:error.response.data.ExceptionMessage}
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
             
              cancelTokenSource.cancel();
             
              return  responseObj ;

        }
    
    
    async currentUsersLogin()
    {
      const cancelTokenSource = axios.CancelToken.source();

            const data= await  axios.get('http://localhost:57143/api/Login/Get',{
                 cancelToken: cancelTokenSource.token
                })
            .then(({data})=>data)

            cancelTokenSource.cancel();
            console.log(data);
            return await data;
    }
  }
    export default new loginService();