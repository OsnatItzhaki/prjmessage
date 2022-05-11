import axios from   "axios";
const HOST_API = process.env.REACT_APP_HOST_API_KEY || '';
class MessagesService{


    /**
     * 
     * @returns {Promise<message[]>}
     */
    async  fetchMessages(){
        const cancelTokenSource = axios.CancelToken.source();
            const data= await  axios.get(`${HOST_API}/api/UrgentMainTable/Get`,{
                cancelToken: cancelTokenSource.token
              })
            .then(({data})=>data)
        cancelTokenSource.cancel();
        return await data;

            }
        }


export default new MessagesService();//singelton