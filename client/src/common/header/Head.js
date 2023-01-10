import React from "react";

const Head = () => {
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
            <label>FAQ's</label>
            <label>Need Help?</label>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Head;
