import React, { useState } from "react";
import { showErrorMessage, showSuccessMessage } from "../common/message";
import { showLoading } from "../common/loading";
import isEmpty from "validator/lib/isEmpty";
import { useSelector, useDispatch } from "react-redux";
import { createCategory } from "../redux/actions/categoriesAction";
import { clearMessages } from "../redux/actions/messsageActions";

const AdminCategoryModal = () => {
  const dispatch=useDispatch();
  const { successMessage, errorMessage } = useSelector(
    (state) => state.message
  );
  const { loading } = useSelector((state) => state.loading);
  const[clientErrorMessage,setClientErrorMessage]=useState('')
  const [category, setCategory] = useState("");

  const handleChange = (e) => {
   dispatch(clearMessages());
    setCategory(e.target.value);
    setClientErrorMessage('')
  };

  const handleModalMessage = () => {
    dispatch(clearMessages())
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmpty(category)) {
      setClientErrorMessage("Please enter a category");
    } else {
      const data = { category };
     dispatch(createCategory(data))
     setCategory('');

    }
  };
  return (
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
              {clientErrorMessage && showErrorMessage(clientErrorMessage)}
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
};

export default AdminCategoryModal;
