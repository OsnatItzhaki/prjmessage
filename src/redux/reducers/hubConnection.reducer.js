import { SET_CHAT_HUB_PROXY } from '../actions/hubConnection.action'
import { INVOKE_ROW_UPDATED } from '../actions/hubConnection.action'
import {SET_CHAT_LOCALCONNECTION}  from '../actions/hubConnection.action'

const initialState={
    chatHubProxy:{},
    localconnection:{}
}

export default function hubConnectionReducer(state=initialState,action){
    switch(action.type){
     
        case SET_CHAT_HUB_PROXY:
           
            return{...state,chatHubProxy:action.payload}
            
        case SET_CHAT_LOCALCONNECTION:
           
            return{...state,localconnection:action.payload}
           
       case INVOKE_ROW_UPDATED:
           {
             state.chatHubProxy.invoke('invokeMessageUpdated', "Web",action.payload).done(function () {
               
              }).fail(function (error) {
                console.log('Invocation failed. Error: ' + error);
              });

           }
        
      default:
            return state;
    }
}