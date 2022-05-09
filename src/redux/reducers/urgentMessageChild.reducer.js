
import { SET_SINGLE_MESSAGE } from '../actions/urgentMessageChild.action'
import { SET_INDEX } from '../actions/urgentMessageChild.action'
const initialState={
    singleMessage:{},
    index:-1
}

export default function urgentMessageChildReducer(state=initialState,action){
    switch(action.type){
        case SET_SINGLE_MESSAGE:
            return{...state,singleMessage:action.payload}
        case SET_INDEX:
            return{...state,index:action.payload}
      default:
            return state;
    }
}