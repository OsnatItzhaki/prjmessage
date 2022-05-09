import { SET_DISTRIBUTION_TYPE } from '../actions/distribution.action'
import { SET_TREAT_DISTRIBUTION } from '../actions/distribution.action'

const initialState={
    distributionTypes:[],
    treatDistribution:[]
}

export default function distributionReducer(state=initialState,action){
    switch(action.type){
        case SET_DISTRIBUTION_TYPE:
           
            return{...state,distributionTypes:action.payload}
        case SET_TREAT_DISTRIBUTION:
          
            return{...state,treatDistribution:action.payload}
        
      default:
            return state;
    }
}