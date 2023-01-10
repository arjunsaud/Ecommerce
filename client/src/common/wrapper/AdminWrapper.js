import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import {GlobalContext} from "../../context/GlobalContext"
import AdminNav from "../header/admin/AdminNav";

const AdminWrapper = () => {
  const { role } = useContext(GlobalContext);
  return (
    (role==="admin")?(<AdminNav/>):(<Navigate to="/login"/>)
  );
};
export default AdminWrapper;
