// Footer.js

import React from "react";
import "./footer1.css";
import "./footer2.css";

const Footer1 = () => {
  return (
    <footer className="footer1">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="footer-section">
              <h2 className="text-uppercase mb-4">Lost And Found System</h2>
              <div className="social-icons">
                <a href="#" className="me-3">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="me-3">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="me-3">
                  <i className="fab fa-github"></i>
                </a>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="footer-section">
              <div className="contact-info">
                <p className="text-center mb-1">
                  <i className="fas fa-map-marker-alt me-2"></i>
                  Address : Barbaria, Moshpukur, Barasat
                </p>
                <p className="text-center mb-1">
                  <i className="fas fa-envelope me-2"></i>
                  Email : mohitofcl7@gmail.com
                </p>
                <p className="text-center mb-0">
                  <i className="fas fa-phone-alt me-2"></i>
                  Phone : +91 7003961588
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Footer2 = () => {
  return (
    <footer className="footer2">
      <div className="text-center p-3">
        &copy; {new Date().getFullYear()} Lost And Found System
      </div>
    </footer>
  );
};

const Footer = () => {
  return (
    <>
      <Footer1 />
      <Footer2 />
    </>
  );
};

export default Footer;
