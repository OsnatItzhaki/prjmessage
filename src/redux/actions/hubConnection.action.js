
export const SET_CHAT_HUB_PROXY='[hubConnection] SET_CHAT_HUB_PROXY'
export const INVOKE_ROW_UPDATED='[hubConnection] INVOKE_ROW_UPDATED'

export function setChatHubProxy(data){
    return {
        type:SET_CHAT_HUB_PROXY,
        payload:data
    }
}

export function invokeHubProxyRowUpdated(messageCode){
    return {
        type:INVOKE_ROW_UPDATED,
        payload:messageCode
    }
}



