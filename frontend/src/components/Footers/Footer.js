import React from "react";
import "./footer.css";

const Footers = () => {
  return (
    <footer className="lostfound">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <div className="basics mb-3">
              <div className="center-align">
                <h2>Lost And Found System</h2>
                <div className="social-icons">
                  <i className="fab fa-facebook"></i>
                  <i className="fab fa-twitter"></i>
                  <i className="fab fa-github"></i>
                  <i className="fab fa-instagram"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12">
            <div className="contact mb-3">
              <div className="contact-info">
                <p>Address: Barbaria, Moshpukur, Barasat</p>
                <p>Email: ranjdeepLGBTQ@gmail.com</p>
                <p>Phone: +91 98304 23492</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footers;
