import React from "react";
import { Link } from "react-router-dom";
import "../../assets/Footer.css";

const Footer = () => {
  return (
    <footer className="page-footer font-small blue pt-4">
      <div className="container text-center">
        <div className="itemsfooter">
          <div className="col-md-3 mt-md-0 mt-3">
            <h6 className="text-uppercase">e-Gadgets</h6>
            <p>avout the e-gadgets</p>
            <ul className="list-unstyled">
              <li>
                <Link className="footer-link" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <hr className="clearfix w-100 d-md-none pb-0" />
          
          <div className="col-md-3 mb-md-0 mb-3">
            <h6 className="text-uppercase">Useful Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link className="footer-link" to="/privacypolicy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/returnpolicy">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/faq">
                  FAQ
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/">
                  Help
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-md-0 mb-3">
            <h6 className="text-uppercase">Connect With Us</h6>
            <ul className="list-unstyled">
              <li>
                <Link className="footer-link" to="/">
                  facebook
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/">
                  twitter
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/">
                  instagram
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/">
                  linkedin
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <div className="footer-copyright text-center py-3">
        © 2023 Copyright All Rights Reserved
        <Link className="link text-white" href="/">
          egadget.com
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
