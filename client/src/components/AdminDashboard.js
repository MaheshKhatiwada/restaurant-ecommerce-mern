import React from 'react'

const AdminDashboard = () => {

    const showHeader=()=>(
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

    const showActionBtns=()=>(
        <div className="bg-light">
            <div className="container">
                <div className="row my-2">
                    <div className="col-md-4 mb-2">
                        <button className="btn btn-outline-info w-100">
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
                         <i class="fas fa-money-check-alt">  View Orders</i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
    return (
            <section>
                {showHeader()}
                {showActionBtns()}
            </section>
    )
}

export default AdminDashboard
