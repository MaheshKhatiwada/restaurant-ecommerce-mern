import React, { useState } from "react";
import { addCategory } from "../api/category";
import { showErrorMessage, showSuccessMessage } from "../common/message";
import { showLoading } from "../common/loading";
import isEmpty from "validator/lib/isEmpty";

const AdminDashboard = () => {
  const [category, setCategory] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setErrorMessage('');
    setSuccessMessage('')
    setCategory(e.target.value);
  };

  const handleModalMessage=()=>{
    setErrorMessage('')
    setSuccessMessage('')

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmpty(category)) {
      setErrorMessage('Please enter a category');
    } else {
      setLoading(true);
      const data = { category };
      addCategory(data)
      .then((response) =>{
        setLoading(false)
        setSuccessMessage(response.data.successMsg)
        setCategory('')
        }
        )
        .catch((error) =>
        {
          setLoading(false);
          setErrorMessage(error.response.data.errorMessage);
          setCategory('')
        });
      }
    }
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
            <button className="btn btn-outline-warning w-100">
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
    <div id="addCategoryModal" className="modal"  onClick={handleModalMessage}>
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
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
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
  return (
    <section>
      {showHeader()}
      {showActionBtns()}
      {showAddCategoryModal()}
    </section>
  );
};

export default AdminDashboard;
