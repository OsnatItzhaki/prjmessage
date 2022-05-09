import axios from   "axios";
import React, { useEffect ,useState} from "react";
class MessagesService{

// /**
//  * 
//  * @param {{message:string,userId:number}} MessageBody 
//  * @returns {promise<message>}
//  */
//     createMessage=(MessageBody)=>{
//         return axios.post('https://academeez-chat.herokuapp.com/api/messages/',MessageBody).then((response)=>{
//             return response.data;
//         });
//     }
    /**
     * 
     * @returns {Promise<message[]>}
     */
    async  fetchMessages(){
        const cancelTokenSource = axios.CancelToken.source();
    //    const [data,setData]= useState(null);
    //     useEffect(() => {
            //const controller = new AbortController();
            const data= await  axios.get('http://localhost:57143/api/UrgentMainTable/Get',{
                cancelToken: cancelTokenSource.token
              })
            .then(({data})=>data)
          
       
        // return () => {
        //     controller.abort(); 
        //   };

        // });
        cancelTokenSource.cancel();
        return await data;

            }
        }


export default new MessagesService();//singelton