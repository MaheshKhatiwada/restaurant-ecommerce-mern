import { setCookie } from "./cookie"
import { setLocalStorage } from "./localstorage"

export const setAuthentication=(token,user)=>{
    setCookie('token',token)
    setLocalStorage('user',user)
}