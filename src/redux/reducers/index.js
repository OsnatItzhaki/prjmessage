import {combineReducers} from 'redux'
import messagesReducer from './mainUrgentTable.reducer'
import singleMessageReducer from './urgentMessageChild.reducer'
import distributionReducer from './distribution.reducer'
import hubConnectionReducer from './hubConnection.reducer'
import userReducer from './user.reducer'
import loginReducer from './login.reducer'
export default combineReducers({
    messages:messagesReducer,
    singleMessage:singleMessageReducer,
    distribution:distributionReducer,
    hub:hubConnectionReducer,
    user:userReducer,
    login:loginReducer,

})