import React from 'react'


const AdminActionButtons = () => (
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
  export default AdminActionButtons;