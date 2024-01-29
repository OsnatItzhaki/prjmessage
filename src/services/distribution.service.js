import axios from   "axios";
const HOST_API = process.env.REACT_APP_HOST_API_KEY || '';
class distributionService{


    /**
     * 
     * @returns {Promise<message[]>}
     */
    async  fetchDistributionType(){
      
        const cancelTokenSource = axios.CancelToken.source();

            const data= await  axios.get(`${HOST_API}/api/Distribution/Get`,{
                cancelToken: cancelTokenSource.token
              })
            .then(({data})=>data)

        cancelTokenSource.cancel();
        return await data;

            
            }
            
            /**
             *
     * 
     * @returns {Promise<message[]>}
     */
    async  fetchTreatDistribution(messageCode){
        
        const cancelTokenSource = axios.CancelToken.source();

            const data= await  axios.get(`${HOST_API}/api/Distribution/Get`,{
                params: {
                    messageCode:messageCode
                }, cancelToken: cancelTokenSource.token
                })
            .then(({data})=>data)

            cancelTokenSource.cancel();
            return await data;

      
            }
            async saveDistribution(saveObject)
        {
            
            let responseObj={iserror:false,data:""}
            const tracking = await axios({
                method: 'post',
                url: `${HOST_API}/api/Distribution/post`,
                headers: {'Content-Type': 'application/json'},
                       
                data: JSON.stringify(saveObject)  ,// This is the body part
                
              }).then(function(response) {
                responseObj={iserror:false,data:response.data}
                return responseObj;
                //return response.data;
            }).catch(function (error) {
                alert("error in distributionService_saveDistribution:"+error.response.data.ExceptionMessage);
                if (error.response) {
                    // Request made and server responded
                    responseObj={iserror:true,data:"data:"+error.response.data.ExceptionMessage+",status:"+error.response.status}
                    
                  }
            
              });
              return  responseObj ;

        }
        async  fetchDistributionDetails(messageCode){
        
            const cancelTokenSource = axios.CancelToken.source();
    
                const data= await  axios.get(`${HOST_API}/api/Distribution/Get`,{
                    params: {
                        messageCode:messageCode,
                        flag:1
                    }, cancelToken: cancelTokenSource.token
                    })
                .then(({data})=>data)
    
            cancelTokenSource.cancel();
            return await data;
    
          
                }
            
        }


export default new distributionService();//singelton