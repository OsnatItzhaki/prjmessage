
import { SET_MESSAGES,SET_MESSAGES_BY_MESSAGECODE } from '../actions/mainUrgentTable.action'
const initialState={
    messages:[]
}

export default function mainUrgentTableReducer(state=initialState,action){
    switch(action.type){
        case SET_MESSAGES:
            let arr=[...state.messages.concat(action.payload)]
            let pp = arr.filter( (ele, ind) => ind === arr.findIndex( elem => elem.MessageCode_Vch === ele.MessageCode_Vch ))//avoid duplicate rows
            return{...state,messages:pp}
            
      case SET_MESSAGES_BY_MESSAGECODE:
        let items = [...state.messages];
        let index = state.messages.findIndex(message => message.MessageCode_Vch ===  action.payload.MessageCode_Vch); //finding index of the item
        let item=action.payload;
        items[index] = item;
            return { 
                ...state, 
                messages: items}
      default:
            return state;
    }
}