import { SET_CHAT_HUB_PROXY } from '../actions/hubConnection.action'
import { INVOKE_ROW_UPDATED } from '../actions/hubConnection.action'


const initialState={
    chatHubProxy:null
}

export default function hubConnectionReducer(state=initialState,action){
    switch(action.type){
      // case SET_ON_CHAT_HUB_PROXY:
      //   {
      //     state.chatHubProxy.on('SendNewRecords', function (eventName, data) {
      
      //       props.setMessages(data);
            
      //       //SetChatHistory(prevChat => prevChat !== "" ? (prevChat + "\n" + eventName + ":" + data) : (eventName + ":" + data));
      //     });
      //     state.chatHubProxy.on('SendUpdatedRow', function (eventName, data) {
            
      //       props.setMessagesByMessageCode(data);
      
      //     });
      //     state.chatHubProxy.on('SendConnectedUserListl', function (eventName,data) {
      //       console.log("SendConnectedUsers");
      //       props.setconnectedusers(data);
      
      //     });
      //   }
        case SET_CHAT_HUB_PROXY:
           
            return{...state,chatHubProxy:action.payload}
           
       case INVOKE_ROW_UPDATED:
           {
             state.chatHubProxy.invoke('invokeMessageUpdated', "Web",action.payload).done(function () {
                alert("invokeMessageUpdated:"+action.payload);
              }).fail(function (error) {
                console.log('Invocation failed. Error: ' + error);
              });

           }
        
      default:
            return state;
    }
}