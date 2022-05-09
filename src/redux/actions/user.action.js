export const SET_USER_DETAIL='[user] SET_USER_DETAIL'


export function setuser(data){
    return {
        type:SET_USER_DETAIL,
        payload:data
    }
}