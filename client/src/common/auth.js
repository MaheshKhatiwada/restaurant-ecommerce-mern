import { getCookie, setCookie,deleteCookie} from "./cookie"
import { getLocalStorage, setLocalStorage,deleteLocalStorage } from "./localstorage"

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

export const logout=()=>{
    deleteCookie('token');
    deleteLocalStorage('user');
}