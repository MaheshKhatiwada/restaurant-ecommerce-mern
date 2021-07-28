import {GET_CATEGORIES} from "../constants/categoryConstants"

const INITIALSTATE={
    categories:[]
}
const categoryReducer=(state=INITIALSTATE,action)=>{
    switch(action.type){
        case GET_CATEGORIES:
            return({
                ...state,
                categories:action.payload
            })
        default:
            return state;
    }
}
export default categoryReducer;