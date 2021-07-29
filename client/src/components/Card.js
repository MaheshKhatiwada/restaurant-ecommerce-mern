import React from 'react'
import {Link} from 'react-router-dom'

const baseUrl="http://localhost:5000"

const Card = ({product}) => {
    return (
        <div className="col-md-4 my-3">
            <div className="card h-100">
            <Link to="#">
                <img
                    className="img-fluid w-100"
                    src={`${baseUrl}/uploads/${product.filename}`} alt="product" />
            </Link>
            {product.productName}
            </div>
        </div>
    )
}

export default Card
