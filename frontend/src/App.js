import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Headers/Headers";
import Footers from "./components/Footers/Footer";
import Register from "./pages/Register/Register";
import List from "./pages/ItemSubList/items";
import Profile from "./pages/Profile/Profile";
import Home1 from "./pages/Home1/Home1";
import Contact from "./pages/Contact/Contact";
// import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import WelcomePage from "./components/WelcomePage/Welcome";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import Item from "./pages/SingleItem/singleItem";
import Dashboard from "./Admin/Dashboard"; // Admin Dashboard Component
import Sidebar from "./Admin/Sidebar"; // Admin Sidebar Component
import bcrypt from "bcryptjs";
import AdminLogin from "./components/AdminLogin";
import UserDashboard from "./pages/L&F Items/UserDashboard";

function App() {
  const user = localStorage.getItem("adminToken");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); // Admin login state
  const navigate = useNavigate();

  // Admin login function
  const handleAdminLogin = async (email, password) => {
    // Retrieve hashed password associated with the provided email (from your database)
    const hashedPasswordFromDatabase =
      "$2b$10$9HyphJK80OtA5K0nDxocguNRbwQYD6qTDyk4iuP5kBiwwWo58Upmm"; // Replace this with your actual retrieval logic

    // Compare the hashed input password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      hashedPasswordFromDatabase
    );

    if (email === "admipro900@gmail.com" && isPasswordCorrect) {
      setIsAdminLoggedIn(true);
      navigate("/AdminDashboard");
    } else {
      console.log("Oppss! Looks Like You're Not The Admin!");
    }
  };

  // Function to handle logout for both admin and user
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAdminLoggedIn(false);
    navigate("/", { replace: true });
  };

  return (
    <>
      <Header />
      {isAdminLoggedIn ? (
        <>
          <Sidebar handleLogout={handleLogout} /> {/* Pass handleLogout */}
          <Routes>
            <Route path="/AdminDashboard" element={<Dashboard />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Home1 handleLogout={handleLogout} />} />
          {user && <Route path="/register" element={<Register />} />}
          {user && <Route path="/gallary" element={<List />} />}
          {user && <Route path="/profile" element={<Profile />} />}
          {user && <Route path="/ItemList" element={<UserDashboard />} />}
          {user && <Route path="/lost&found/:id" element={<Item />} />}
          {user && <Route path="/contact" element={<Contact />} />}
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={<Login handleAdminLogin={handleAdminLogin} />}
          />
          <Route
            path="/admin-login"
            element={<AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />}
          />
          <Route path="/email-verify/:id/:token" element={<EmailVerify />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/password-reset/:id/:token"
            element={<PasswordReset />}
          />
        </Routes>
      )}
      <Footers />
    </>
  );
}

export default App;
