import { CLEAR_MESSAGE } from "../constants/messageConstants";

export const clear_message=()=>dispatch=>{
    dispatch({
        type:CLEAR_MESSAGE
    })
}