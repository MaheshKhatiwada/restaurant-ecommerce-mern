import React from 'react'
import {Link} from 'react-router-dom'

const baseUrl="http://localhost:5000"

const Card = ({product}) => {
    return (
        <div className="col-md-4 my-3 px-3">
            <div className="card h-100">
            <Link to="#">
                <img
                    className="img-fluid w-100 "
                    src={`${baseUrl}/uploads/${product.filename}`} alt="product" />
            </Link>
            <div className="card-body text-center">
                <h5>{product.productName}</h5>
                <hr />
                <h6 className="mb-">
                    <span className="text-secondary mr-2">
                       Rs. {product.productPrice}
                    </span>
                </h6>
                <p>{product.productDesc.length>60 ?
                product.productDesc.substring(0,60)+ "..." :
                product.productDesc}</p>
                <button
                    type="button"
                    className="btn btn-secondary btn-sm mr-1 my-1 mx-2">
                        <i className="far fa-edit pr-1 "></i>
                           Edit
                    </button>
                    <button
                    type="button"
                    className="btn btn-danger btn-sm">
                        <i className="far fa-trash-alt pr-1 "></i>
                           Delete
                    </button>
            </div>
            </div>
        </div>
    )
}

export default Card
