import MessagesService from "../../services/Messages.service";
export const SET_MESSAGES='[mainUrgentTable] SET_MESSAGES'
export const SET_MESSAGES_BY_MESSAGECODE='[mainUrgentTable] SET_MESSAGES_BY_MESSAGECODE'

export function setMessages(messages){
    return {
        type:SET_MESSAGES,
        payload:messages
    }
}
export function setMessagesByMessageCode(message){
    return {
        type:SET_MESSAGES_BY_MESSAGECODE,
        payload:message
    }
}

export function fetchMessages(){
    return async (dispatch)=>{
        const messages= await MessagesService.fetchMessages();
        dispatch(setMessages(messages));
    }
}
