import React from "react";
import AdminShowHeader from "./AdminHeader";
import AdminActionButtons from "./AdminActionButtons";
import AdminCategoryModal from "./AdminCategoryModal";
import AdminProductModal from "./AdminProductModal";

const AdminDashboard = () => {
  return (
    <section>
      <AdminShowHeader />
      <AdminActionButtons />
      <AdminCategoryModal />
      <AdminProductModal />
    </section>
  );
};

export default AdminDashboard;
