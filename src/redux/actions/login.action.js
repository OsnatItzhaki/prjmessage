export const SET_CONNECTED_USERS='[login] SET_CONNECTED_USERS'
export const SET_CONNECT_ID='[login] SET_CONNECT_ID'


export function setconnectedusers(data){
    return {
        type:SET_CONNECTED_USERS,
        payload:data
    }
}
export function setconnectId(data){
    return {
        type:SET_CONNECT_ID,
        payload:data
    }
}