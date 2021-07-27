import React, { useState, useEffect } from "react";
import { addCategory, getCategories } from "../api/category";
import { createProduct } from "../api/product";

import { showErrorMessage, showSuccessMessage } from "../common/message";
import { showLoading } from "../common/loading";
import isEmpty from "validator/lib/isEmpty";

const AdminDashboard = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    productImage: null,
    productName: "",
    productDesc: "",
    productPrice: "",
    productCategory: "",
    productQty: "",
  });
  const {
    productImage,
    productName,
    productPrice,
    productDesc,
    productQty,
    productCategory,
  } = productData;

  useEffect(() => {
    loadCategories();
  }, [loading]);

  const loadCategories = () => {
    getCategories()
      .then((response) => setCategories(response.data.categories))
      .catch((error) => console.log("loading category error", error));
  };

  const handleChange = (e) => {
    setErrorMessage("");
    setSuccessMessage("");
    setCategory(e.target.value);
  };

  const handleModalMessage = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };
  const handelImageChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.files[0], //for image it should be e.target.files[0]
    });
  };
  const handleProductChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };
  const handleProductSubmit = (e) => {
    e.preventDefault();

    if (productImage === null) {
      setErrorMessage("Please upload the image");
    } else if (
      isEmpty(productName) ||
      isEmpty(productPrice) ||
      isEmpty(productDesc)
    ) {
      setErrorMessage("All fields are required");
    } else if (isEmpty(productCategory)) {
      setErrorMessage("Please select a category");
    } else if (isEmpty(productQty)) {
      setErrorMessage("Please enter the quantity");
    } else {
      //Success
      const formData = new FormData();
      formData.append("productImage", productImage);
      formData.append("productName", productName);
      formData.append("productPrice", productPrice);
      formData.append("productDesc", productDesc);
      formData.append("productCategory", productCategory);
      formData.append("productQty", productQty);

      createProduct(formData)
        .then((response) => console.log("created response", response))
        .catch((error) => console.log("error", error));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmpty(category)) {
      setErrorMessage("Please enter a category");
    } else {
      setLoading(true);
      const data = { category };
      addCategory(data)
        .then((response) => {
          setLoading(false);
          setSuccessMessage(response.data.successMsg);
          setCategory("");
        })
        .catch((error) => {
          setLoading(false);
          setErrorMessage(error.response.data.errorMsg);
        });
    }
  };
  const showHeader = () => (
    <div className="bg-dark text-white py-3 mx-2">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1>
              <i className="fas fa-home"> Dashboard</i>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );

  const showActionBtns = () => (
    <div className="bg-light">
      <div className="container">
        <div className="row my-2">
          <div className="col-md-4 mb-2">
            <button
              className="btn btn-outline-info w-100"
              data-bs-toggle="modal"
              data-bs-target="#addCategoryModal"
            >
              <i className="fas fa-plus"> Add Category</i>
            </button>
          </div>
          <div className="col-md-4 mb-2">
            <button
              className="btn btn-outline-warning w-100"
              data-bs-toggle="modal"
              data-bs-target="#addFoodModal"
            >
              <i className="fas fa-plus"> Add Food</i>
            </button>
          </div>
          <div className="col-md-4 mb-2">
            <button className="btn btn-outline-success w-100">
              <i className="fas fa-money-check-alt"> View Orders</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  const showAddCategoryModal = () => (
    <div id="addCategoryModal" className="modal" onClick={handleModalMessage}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header bg-info text-white ">
              <h5 className="modal-title ">Add Category</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body my-2">
              {successMessage && showSuccessMessage(successMessage)}
              {errorMessage && showErrorMessage(errorMessage)}
              {loading ? (
                <div className="text-center">{showLoading()}</div>
              ) : (
                <>
                  <label className="text-secondary my-1">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    name="category"
                    value={category}
                    onChange={handleChange}
                  />
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-info">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const showFoodModal = () => (
    <div id="addFoodModal" className="modal" onClick={handleModalMessage}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <form onSubmit={handleProductSubmit}>
            <div className="modal-header bg-warning text-white ">
              <h5 className="modal-title ">Add Food</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body my-2">
              {successMessage && showSuccessMessage(successMessage)}
              {errorMessage && showErrorMessage(errorMessage)}
              {loading ? (
                <div className="text-center">{showLoading()}</div>
              ) : (
                <>
                  <div className="input-group mb-3">
                    <input
                      type="file"
                      className="form-control"
                      name="productImage"
                      onChange={handelImageChange}
                    />
                    <label className="input-group-text">Upload</label>
                  </div>

                  <div className="form-group mb-3">
                    <label className="text-secondary">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="productName"
                      value={productName}
                      onChange={handleProductChange}
                    />
                  </div>

                  <div className="form-floating mb-2">
                    <textarea
                      className="form-control"
                      placeholder="Leave a comment here"
                      style={{ height: "100px" }}
                      name="productDesc"
                      value={productDesc}
                      onChange={handleProductChange}
                    ></textarea>
                    <label>Description</label>
                  </div>

                  <div className="form-group mb-3">
                    <label className="text-secondary">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      name="productPrice"
                      value={productPrice}
                      onChange={handleProductChange}
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label className="text-secondary">Category</label>
                      <select
                        className="form-select"
                        name="productCategory"
                        onChange={handleProductChange}
                      >
                        <option value="">Choose one...</option>
                        {categories &&
                          categories.map((c) => (
                            <option value={c._id} key={c._id}>
                              {c.category}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="text-secondary">Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        min="0"
                        max="1000"
                        name="productQty"
                        value={productQty}
                        onChange={handleProductChange}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-warning text-white">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  return (
    <section>
      {showHeader()}
      {showActionBtns()}
      {showAddCategoryModal()}
      {showFoodModal()}
    </section>
  );
};

export default AdminDashboard;
