
import { SET_USER_DETAIL } from '../actions/user.action'
const initialState={
    user:{}
    // userCode:null,
    // userName:null,
    // levelPermissions:null,
}
export default function userReducer(state=initialState,action){
    switch(action.type){
        case SET_USER_DETAIL:          
            // return{...state,userCode:action.payload.userCode ,userName:action.payload.userName,levelPermissions:action.payload.levelPermissions}
            return{...state,user:action.payload}
      default:
            return state;
    }
}