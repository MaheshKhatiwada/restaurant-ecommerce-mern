import React from 'react'

const AdminEditProduct = ({match}) => {
    const productId=match.params.productId// match contains params from Route used in App.js
    console.log(productId)
    return (
        <div>
            Edit
        </div>
    )
}

export default AdminEditProduct
