import React, { useState } from "react";
import Categories from "../AdminPages/Categories/Categories";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Remove admin token
    navigate("/"); // Redirect to home after logout
  };

  return (
    <div
      className="col-md-3 col-lg-2 sidebar-offcanvas pl-0"
      id="sidebar"
      role="navigation"
      style={{ backgroundColor: "#e9ecef" }}
    >
      <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
        <li className="nav-item mb-2 mt-3">
          <a className="nav-link text-secondary" href="#">
            <h5>Jacob Nejam</h5>
          </a>
        </li>
        <li className="nav-item mb-2 ">
          <Link to="/" className="nav-link text-secondary">
            <i className="fas fa-user font-weight-bold"></i>
            <span className="ml-3">Dashboard</span>
          </Link>
        </li>
        <li className="nav-item mb-2">
          <a
            className="nav-link text-secondary"
            href="#"
            onClick={toggleDropdown}
            aria-expanded={isOpen ? "true" : "false"}
          >
            <i className="far fa-file-word font-weight-bold"></i>{" "}
            <span className="ml-3">Categories</span>
          </a>
          <div className={`collapse ${isOpen ? "show" : ""}`} id="submenu1">
            <ul className="nav flex-column pl-3">
              <li className="nav-item mb-2">
                <Link to="/catagories/add" className="nav-link text-secondary">
                  <i class="fa-regular fa-circle"></i>&nbsp; Add New
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/catagories/list" className="nav-link text-secondary">
                  <i class="fa-regular fa-circle"></i>&nbsp; List
                </Link>
              </li>
            </ul>
          </div>
          <li class="nav-item mb-2">
            <Link to="/item" class="nav-link text-secondary">
              <i class="far fa-chart-bar font-weight-bold"></i>
              <span className="ml-3">Item</span>
            </Link>
          </li>
          <li class="nav-item mb-2">
            <a class="nav-link text-secondary" href="#">
              <i class="fas fa-file-export font-weight-bold"></i>
              <span className="ml-3">Pages</span>
            </a>
          </li>
          <li class="nav-item mb-2">
            <a class="nav-link text-secondary" href="#">
              <i class="fas fa-tablet-alt font-weight-bold"></i>
              <span className="ml-3">Messages</span>
            </a>
          </li>
          <li class="nav-item mb-2">
            <a class="nav-link text-secondary" href="#">
              <i class="fas fa-atom font-weight-bold"></i>{" "}
              <span className="ml-3">Users</span>
            </a>
          </li>
          <li class="nav-item mb-2">
            <a class="nav-link text-secondary" href="#">
              <i class="fa-solid fa-phone font-weight-bold"></i>
              <span className="ml-3">Contact Information</span>
            </a>
          </li>
          <li class="nav-item mb-2">
            <a class="nav-link text-secondary" href="#">
              <i class="fa-solid fa-gear font-weight-bold"></i>{" "}
              <span className="ml-3">System Information</span>
            </a>
          </li>
        </li>
        {/* ... (other sidebar items) */}
        <li className="nav-item mb-2">
          <a
            className="nav-link text-secondary"
            href="#"
            onClick={handleLogout}
          >
            <i className="fa-solid fa-sign-out-alt font-weight-bold"></i>{" "}
            <span className="ml-3">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
