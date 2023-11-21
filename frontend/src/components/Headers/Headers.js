import React from "react";
import UnauthenticatedNav from '../Navbar/UnauthenticatedNav';
import AuthenticatedNav from '../Navbar/AuthenticatedNav';
import { useLocation } from "react-router-dom";

const Headers = () => {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div className={`menu transparent-menu ${isHomePage ? "home-page" : ""}`}>
      <div className="name">
        <h3>LOST AND FOUND SYSTEM</h3>
      </div>
      <nav className="menuitems">
        {isAuthenticated ? (
          <AuthenticatedNav />
        ) : (
          <UnauthenticatedNav />
        )}
      </nav>
    </div>
  );
};

export default Headers;
