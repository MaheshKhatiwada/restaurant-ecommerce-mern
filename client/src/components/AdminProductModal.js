import React, { useState } from "react";
import isEmpty from "validator/lib/isEmpty";
import { showErrorMessage, showSuccessMessage } from "../common/message";
import { showLoading } from "../common/loading";
import { useSelector, useDispatch } from "react-redux";
import { clearMessages } from "../redux/actions/messsageActions";
import { createProduct } from "../redux/actions/productActions";


const AdminProductModal = () => {
  const dispatch=useDispatch();
  const { successMessage, errorMessage } = useSelector(
    (state) => state.message
  );
  const { loading } = useSelector((state) => state.loading);
  const { categories} = useSelector((state) => state.categories);

  const[clientErrorMessage,setClientErrorMessage]=useState('');
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
  const handleModalMessage = () => {
   dispatch(clearMessages());
   setClientErrorMessage('');
  };
  const handleProductSubmit = (e) => {
    e.preventDefault();

    if (productImage === null) {
      setClientErrorMessage("Please upload the image");
    } else if (
      isEmpty(productName) ||
      isEmpty(productPrice) ||
      isEmpty(productDesc)
    ) {
      setClientErrorMessage("All fields are required");
    } else if (isEmpty(productCategory)) {
      setClientErrorMessage("Please select a category");
    } else if (isEmpty(productQty)) {
      setClientErrorMessage("Please enter the quantity");
    } else {
      //Success

      const formData = new FormData();
      formData.append("productImage", productImage);
      formData.append("productName", productName);
      formData.append("productPrice", productPrice);
      formData.append("productDesc", productDesc);
      formData.append("productCategory", productCategory);
      formData.append("productQty", productQty);

      dispatch(createProduct(formData))
      setProductData({
        productImage: null,
        productName: "",
        productDesc: "",
        productPrice: "",
        productCategory: "",
        productQty: "",
      });

    }
  };
  return (
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
              {clientErrorMessage&&showErrorMessage(clientErrorMessage)}
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
};

export default AdminProductModal;
