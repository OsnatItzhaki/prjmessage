
import { SET_CONNECTED_USERS} from '../actions/login.action'
import {SET_CONNECT_ID} from '../actions/login.action'
const initialState={
    ConnectedUsers:[{}],
    ConnectionId:{}
    // { ConnectionId = id, UserName = userName }
}
export default function loginReducer(state=initialState,action){
    switch(action.type){
        case SET_CONNECTED_USERS:          
            
            return{...state,ConnectedUsers:action.payload}
        case SET_CONNECT_ID:          
        
        return{...state,ConnectionId:action.payload}
      default:
            return state;
    }
}