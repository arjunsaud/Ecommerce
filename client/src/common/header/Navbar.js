import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="header">
      <div className="container hamburger">
        <div className="toggle" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? (
            <CgClose color="red" className="close" />
          ) : (
            <FiMenu color="black" className="open" />
          )}
        </div>
        <div
          className={
            mobileMenu ? "nav-links-mobile" : "links f_flex capitalize"
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
          <Link className="link" to="/shop">
            My Shop
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
