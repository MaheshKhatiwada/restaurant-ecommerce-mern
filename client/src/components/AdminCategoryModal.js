import React,{useState} from "react";
import { showErrorMessage, showSuccessMessage } from "../common/message";
import { showLoading } from "../common/loading";
import { addCategory} from "../api/category";
import isEmpty from "validator/lib/isEmpty";

const AdminCategoryModal = () => {
    const [category, setCategory] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setErrorMessage("");
    setSuccessMessage("");
    setCategory(e.target.value);
  };

  const handleModalMessage = () => {
    setErrorMessage("");
    setSuccessMessage("");
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
