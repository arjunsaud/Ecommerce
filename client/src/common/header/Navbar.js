import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  const [MobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="header">
      <div className="container hamburger">
        <Link className="toggle" onClick={() => setMobileMenu(!MobileMenu)}>
          {MobileMenu ? (
            <CgClose className="close" />
          ) : (
            <FiMenu className="open" />
          )}
        </Link>
        <div
          className={
            MobileMenu ? "nav-links-mobile" : "links f_flex capitalize"
          }
          onClick={() => setMobileMenu(false)}
        >
          <Link className="link" to="/">
            home
          </Link>

          <Link className="link" to="/customerservice">
            customer service
          </Link>
          <Link className="link" to="/contact">
            contact
          </Link>
          <Link className="link" to="/about">
            about
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
