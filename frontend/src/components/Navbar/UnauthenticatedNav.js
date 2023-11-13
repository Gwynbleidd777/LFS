// UnauthenticatedNav.js
import React from "react";
import { NavLink } from "react-router-dom";
import '../Headers/headers.css'
import '../../pages/Home1/Home1'

const UnauthenticatedNav = () => {
  return (
    <div className="menu transparent-menu">
      <div className="name">
        {/* <h3>LOST AND FOUND SYSTEM</h3> */}
      </div>
      <nav className="menuitems">
        <ul className="nav-list">
          <li>
            <NavLink to="/" className="nav-menu nav-menu-animated">
              <i className="fa-solid fa-house"></i>Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="nav-menu nav-menu-animated">
              <i className="fa-solid fa-right-to-bracket"></i>Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UnauthenticatedNav;
