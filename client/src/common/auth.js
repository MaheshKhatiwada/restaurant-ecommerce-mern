import { getCookie, setCookie } from "./cookie"
import { getLocalStorage, setLocalStorage } from "./localstorage"

export const setAuthentication=(token,user)=>{
    setCookie('token',token)
    setLocalStorage('user',user)
}
export const isAuthenticated=()=>{
    if(getCookie('token')&& getLocalStorage('user')){
        return getLocalStorage('user')
    }else{
        return false;
    }
}