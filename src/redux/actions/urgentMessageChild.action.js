export const SET_SINGLE_MESSAGE='[urgentMessageChild] SET_SINGLE_MESSAGE'
export const SET_INDEX='[urgentMessageChild] SET_INDEX'

export function setSingleMessage(message){
    return {
        type:SET_SINGLE_MESSAGE,
        payload:message
    }
}
export function setIndex(index){
    return {
        type:SET_INDEX,
        payload:index
    }
}
