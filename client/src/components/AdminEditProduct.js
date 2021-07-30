import React,{useState,useEffect} from 'react'
import { getProduct } from '../redux/actions/productActions';
import { useDispatch ,useSelector} from 'react-redux';

const AdminEditProduct = ({match}) => {
    const {product}=useSelector(state=> state.products)
    const dispatch=useDispatch()
    const productId=match.params.productId// match contains params from Route used in App.js

    const [productImage,setProductImage]=useState(null);
    const [productName,setProductName]=useState('');
    const [productDesc,setProductDesc]=useState('');
    const [productPrice,setProductPrice]=useState('');
    const [producCategory,setProductCategory]=useState('');
    const [productQty,setProductQty]=useState('');

    useEffect(()=>{
        if(!product){
            dispatch(getProduct(productId))
        }else{
            setProductImage(product.filename);
            setProductName(product.productName);
            setProductDesc(product.productDesc);
            setProductPrice(product.productPrice);
            setProductCategory(product.productCategory);
            setProductQty(product.productQty);
        }
    },[dispatch,productId,product])

    return (
        <div>
            {productImage}
            {productName}
        </div>
    )
}

export default AdminEditProduct
