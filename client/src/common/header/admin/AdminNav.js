import React, { useContext, useState } from "react";
import "../../../assets/admin/adminnav.css";
import { FiLogOut } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";
import { GlobalContext } from "../../../context/GlobalContext";
import { CgClose } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
const AdminNav = () => {
  const { logout } = useContext(GlobalContext);

  const [menu,setMenu]=useState(true)

  const handleClick=()=>{
    setMenu(!menu)
  }

  return (
    <div className="sidenavbar">
      <div className="topbars">
        <div className="sideham" onClick={handleClick}>
          {
            menu?
            <FiMenu />
            :
            <CgClose/>
          }
        </div>
        <Link className="sidelogo h1 mx-2" to="/admin">e-Gadget</Link>
      </div>

      <div className="sidemenu">
        <div className={
          menu?"sidemenulist":"sidemenulistmobile"
        }>
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
          <Link className="asidemenulink" to="/admin/customercare">
            Chats
          </Link>
          <Link className="asidemenulink" to="/admin/faq">
            Faq
          </Link>
          <Link className="asidemenulink" to="/admin/offer">
            Offer
          </Link>
          <Link className="asidemenulink" to="/admin/profile">
            Profile
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
