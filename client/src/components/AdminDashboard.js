import React, { useEffect } from "react";
import AdminShowHeader from "./AdminHeader";
import AdminActionButtons from "./AdminActionButtons";
import AdminCategoryModal from "./AdminCategoryModal";
import AdminProductModal from "./AdminProductModal";
import AdminBody from "./AdminBody"
import { useDispatch } from "react-redux";
import { getCategories } from "../redux/actions/categoriesAction";
import { getProducts } from "../redux/actions/productActions";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <section>
      <AdminShowHeader />
      <AdminActionButtons />
      <AdminCategoryModal />
      <AdminProductModal />
      <AdminBody/>
    </section>
  );
};

export default AdminDashboard;
