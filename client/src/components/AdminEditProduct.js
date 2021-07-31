import React, { useState, useEffect,Fragment } from "react";
import { getProduct } from "../redux/actions/productActions";
import {Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/actions/categoriesAction";
import AdminHeader from "./AdminHeader"
import axios from "../api/axios";

const baseUrl = "http://localhost:5000";

const AdminEditProduct = ({ match ,history}) => {
  const { product } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  const dispatch = useDispatch();
  const productId = match.params.productId; // match contains params from Route used in App.js

  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productQty, setProductQty] = useState("");

  useEffect(() => {
    if (!product) {
      dispatch(getProduct(productId));
      dispatch(getCategories());
    } else {
      setProductImage(product.filename);
      setProductName(product.productName);
      setProductDesc(product.productDesc);
      setProductPrice(product.productPrice);
      setProductCategory(product.productCategory);
      setProductQty(product.productQty);
    }
  }, [dispatch, productId, product]);

  const handleImageUpload=(e)=>{
    const image=e.target.files[0];
    setProductImage(image);
  }

  const handleProductSubmit=async(e)=>{
    e.preventDefault();

    const formData= new FormData();
    formData.append('productImage',productImage);
    formData.append('productName',productName);
    formData.append('productPrice',productPrice);
    formData.append('productDesc',productDesc);
    formData.append('productCategory',productCategory);
    formData.append('productQty',productQty);

    const config={
      headers:{
        'Content-Type':'multipart/form-data',
      },
    }
    try {
     await axios.put(`/api/product/${productId}`,formData,config)
     history.push('/dashboard/admin')

    } catch (error) {
      console.log('failure',error)
    }

  }
  return (
    <div>
      <AdminHeader />
      <div className="container my-3">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <Link to="/dashboard/admin">
              <span className="fas fa-arrow-left">Go Back</span>
            </Link>
            <div>
              <br />
              <div className="modal-content">
                <form onSubmit={handleProductSubmit}>
                  <div className="modal-header bg-warning text-white">
                    <h5 className="modal-title">Update Food</h5>
                  </div>
                  <div className="modal-body my-2">
                    <Fragment>
                      <label className="btn btn-dark mr-4">
                        Choose file
                        <input
                          type="file"
                          name="productImage"
                          accept="images/*"
                          hidden
                          onChange={handleImageUpload}
                        />
                      </label>
                      {productImage && productImage.name ? (
                        <span className="badge badge-secondary">
                          {productImage.name}
                        </span>
                      ) : productImage ? (
                        <img
                          className="img-thumbnail"
                          style={{
                            width: "120px",
                            height: "80px",
                          }}
                          src={`${baseUrl}/uploads/${productImage}`}
                          alt="product"
                        />
                      ) : null}

                      <div className="form-group my-2">
                        <label className="text-secondary my-1">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="productName"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="text-secondary my-1">Description</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          name="productDesc"
                          value={productDesc}
                          onChange={(e) => setProductDesc(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label className="text-secondary my-1">Price</label>
                        <input
                          type="text"
                          className="form-control"
                          name="productPrice"
                          value={productPrice}
                          onChange={(e) => setProductPrice(e.target.value)}
                        />
                      </div>
                      <div className="row">
                        <div className=" col-md-6">
                          <label className="text-secondary my-1">Category</label>
                          <select
                            className="form-select"
                            name="productCategory"
                            value={productCategory}
                            onChange={(e) => setProductCategory(e.target.value)}
                          >
                            <option value="">Choose one...</option>
                            {categories &&
                              categories.map((c) => (
                                <option key={c._id} value={c._id}>
                                  {c.category}
                                </option>
                              ))}
                          </select>
                        </div>

                        <div className=" col-md-6">
                          <label className="text-secondary my-1">Quantity</label>
                          <input
                            type="number"
                            className="form-control"
                            min="0"
                            max="1000"
                            name="productQty"
                            value={productQty}
                            onChange={(e) => setProductQty(e.target.value)}
                          />
                        </div>
                      </div>
                    </Fragment>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-warning text-white"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditProduct;
