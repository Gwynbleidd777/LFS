import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "", // Add confirmPassword field
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  }); // State to toggle password visibility
  const [showPasswordNotes, setShowPasswordNotes] = useState(false); // State to toggle password notes display

  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      setError("Please Enter A Valid Email Address !");
      return;
    }

    // Password and confirm password match validation
    if (data.password !== data.confirmPassword) {
      setError("Passwords Do Not Match !");
      return;
    }

    // Additional password validation checks
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (!passwordPattern.test(data.password)) {
      setError(
        "Password must contain at least 8 characters, including one letter, one number, and one special character."
      );
      return;
    }

    try {
      const url = "http://localhost:8080/api/register";
      const { data: res } = await axios.post(url, data);
      setMsg(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const showPasswordNotesBox = () => {
    setShowPasswordNotes(true);
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Already A User ?</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Log In
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create An Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
            />
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
                type={showPassword.password ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                onFocus={showPasswordNotesBox}
                required
                className={styles.pass}
              />
              <span
                className={styles.password_icon}
                onClick={() => togglePasswordVisibility("password")}
              >
                {showPassword.password ? (
                  <FaEyeSlash
                    className={`${styles.eye_icon} ${styles.password_icon}`}
                  />
                ) : (
                  <FaEye
                    className={`${styles.eye_icon} ${styles.password_icon}`}
                  />
                )}
              </span>
              {showPasswordNotes && (
                <div className={styles.password_notes_box}>
                  <p>Password must :</p>
                  <ul>
                    <li>Be at least 8 characters long</li>
                    <li>Contain at least one letter</li>
                    <li>Contain at least one number</li>
                    <li>Contain at least one special character</li>
                  </ul>
                </div>
              )}
            </div>
            <div className={styles.password_container}>
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={handleChange}
                value={data.confirmPassword}
                required
                className={styles.pass}
              />
              <span
                className={styles.password_icon}
                onClick={() => togglePasswordVisibility("confirmPassword")}
              >
                {showPassword.confirmPassword ? (
                  <FaEyeSlash
                    className={`${styles.eye_icon} ${styles.password_icon}`}
                  />
                ) : (
                  <FaEye
                    className={`${styles.eye_icon} ${styles.password_icon}`}
                  />
                )}
              </span>
            </div>
            {error && <div className={styles.error_msg}>{error}</div>}
            {msg && <div className={styles.success_msg}>{msg}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
