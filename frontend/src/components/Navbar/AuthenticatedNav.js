import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const AuthenticatedNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true }); // Redirect to the home page
  };
  return (
    <div className="menu transparent-menu">
      <div className="name">{/* <h3>LOST AND FOUND SYSTEM</h3> */}</div>
      <nav className="menuitems">
        <ul className="nav-list">
          {/* <li>
            <NavLink to="/" className="nav-menu nav-menu-animated">
              <i className="fa-solid fa-house"></i>Home
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/ItemList" className="nav-menu nav-menu-animated">
              <i className="fa-solid fa-circle-info"></i>Lost & Found
            </NavLink>
          </li>
          <li>
            <NavLink to="/gallary" className="nav-menu nav-menu-animated">
              <i className="fa-solid fa-image"></i>My Lost & Found
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="nav-menu nav-menu-animated">
              <i className="fa-solid fa-address-book"></i>Contact Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className="nav-menu nav-menu-animated">
              <i className="fa-solid fa-user"></i>My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className="nav-menu nav-menu-animated"
              onClick={handleLogout}
            >
              <i className="fa-solid fa-sign-out"></i>Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AuthenticatedNav;
