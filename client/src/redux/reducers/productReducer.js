import {GET_PRODUCTS,CREATE_PRODUCT,DELETE_PRODUCT} from "../constants/productConstants"

const INITIAL_STATE={
    products:[]
}

const productReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case GET_PRODUCTS:
            return({
                products:[...action.payload]
            })
        case CREATE_PRODUCT:
            return({
                products:[...state.products,action.payload]
            })
        case DELETE_PRODUCT:
            return({
                products:state.products.filter(p=> p._id !== action.payload._id)
            })
        default:
            return state;
    }
}

export default productReducer;