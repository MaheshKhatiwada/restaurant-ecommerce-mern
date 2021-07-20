import React from 'react';
export const showErrorMessage=(errorMessage)=>(
    <div className="alert alert-danger" role="alert">
        {errorMessage}
</div>
);

export const showSuccessMessage=(successMessage)=>(
    <div className="alert alert-success" role="alert">
        {successMessage}
</div>
);
