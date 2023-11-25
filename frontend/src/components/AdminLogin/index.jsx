import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const AdminLogin = ({ setIsAdminLoggedIn }) => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/admin/auth";
      const response = await axios.post(url, data);
  
      // Assuming the token is received in the response
      const { token } = response.data;
  
      localStorage.setItem("adminToken", token); // Store admin token in local storage
      setIsAdminLoggedIn(true); // Set admin login state to true
      navigate("/AdminDashboard"); // Redirect to Admin Dashboard
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <div className={styles.admin_login}>
            <h1>Already A User ?</h1>
            <Link to="/login">
              <button type="button" className={styles.white_btn}>
                User Login
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Admin Login</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <div className={styles.password_container}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={styles.pass}
              />
              <span
                className={styles.password_icon}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FaEyeSlash className={styles.eye_icon} />
                ) : (
                  <FaEye className={styles.eye_icon} />
                )}
              </span>
            </div>
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

AdminLogin.propTypes = {
  setIsAdminLoggedIn: PropTypes.func.isRequired,
};

export default AdminLogin;
