import React, { useContext } from "react";
import "../../../assets/admin/adminnav.css";
import { FiLogOut } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";
import { GlobalContext } from "../../../context/GlobalContext";

const AdminNav = () => {
  const { logout } = useContext(GlobalContext);

  return (
    <div className="sidenavbar">
      <div className="topbar">
        <div className="sidelogo h1 mx-2">e-Gadget</div>
      </div>
      <div className="sidemenu">
        <div className="sidemenulist">
          <Link className="asidemenulink" to="/admin">
            Dashboard
          </Link>
          <Link className="asidemenulink" to="/admin/products">
            Products
          </Link>
          <Link className="asidemenulink" to="/admin/specs">
            Specs
          </Link>
          <Link className="asidemenulink" to="/admin/users">
            Users
          </Link>
          <Link className="asidemenulink" to="/admin/profile">
            Profile
          </Link>
          <Link className="asidemenulink" to="/admin/customercare">
            Messages
          </Link>
          <Link className="asidemenulink text-danger" onClick={() => logout()}>
            Logout <FiLogOut />
          </Link>
        </div>
        <div className="outletsection">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
