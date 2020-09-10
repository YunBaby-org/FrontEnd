import Cookies from 'js-cookie'

//key login-status

export function GetLoginStatus(){
    return Cookies.get('login-status')
}
export function SetCookie(key){
    console.log("set token")
    return Cookies.set(key,true)
}
export function RemoveCookie(key) {
    return Cookies.remove(key)
}