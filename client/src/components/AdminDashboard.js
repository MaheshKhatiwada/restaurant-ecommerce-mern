import React, { useState } from "react";

const AdminDashboard = () => {
  const [category, setCategory] = useState('');

  const handleChange=(e)=>{
      setCategory(e.target.value)
  }
  const handleSubmit=(e)=>{
      e.preventDefault();
      console.log(category)
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
    <div id="addCategoryModal" className="modal">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
        <form onClick={handleSubmit}>
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

              <label className="text-secondary my-1">Category</label>
              <input
                type="text"
                className="form-control"
                name="category"
                value={category}
                onChange={handleChange}
              />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="submit" className="btn btn-info" >Submit</button>
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
