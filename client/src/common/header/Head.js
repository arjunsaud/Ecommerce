import React from "react";
import { useNavigate } from "react-router-dom";

const Head = () => {
  const navigate=useNavigate()
  const handleClick=()=>{
    navigate("/faq")
  }
  return (
    <div>
      <section className="head">
        <div className="container d_flex">
          <div className="left row">
            <i className="fa fa-phone"></i>
            <i className="fa fa-envelope"></i>
            <label> support@e_gadget.com</label>
          </div>
          <div className="right cloumn RText">
            <label style={{cursor:"pointer"}} onClick={handleClick}>FAQ's</label>
            <label>Need Help?</label>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Head;
