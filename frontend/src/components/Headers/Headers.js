import React from "react";
// import { NavLink } from "react-router-dom";
import UnauthenticatedNav from '../Navbar/UnauthenticatedNav'; // Import the UnauthenticatedNav component
import AuthenticatedNav from '../Navbar/AuthenticatedNav'; // Import the AuthenticatedNav component
import './headers.css';

const Headers = () => {
  // Check if the user is authenticated by checking the token in local storage
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div className="menu transparent-menu">
      <div className="name">
        <h3>LOST AND FOUND SYSTEM</h3>
      </div>
      <nav className="menuitems">
        {isAuthenticated ? (
          <AuthenticatedNav /> // Render AuthenticatedNav for authenticated users
        ) : (
          <UnauthenticatedNav /> // Render UnauthenticatedNav for unauthenticated users
        )}
      </nav>
    </div>
  );
};

export default Headers;