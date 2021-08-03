import React,{useEffect} from 'react'
import {useSelector} from 'react-redux';
import { useDispatch } from "react-redux";
import { getProducts } from "../redux/actions/productActions";
import Card from './Card';

const UserDashboard = () => {
    const dispatch = useDispatch()
    const {products}=useSelector(state=>state.products)
    useEffect(() => {
        dispatch(getProducts());
      }, [dispatch]);

    return (
        <div className="container">
            <div className="row">
                <div className="card-group">
                    {products&& products.map(product=>(
                        <Card key={product._id} product={product} />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default UserDashboard
