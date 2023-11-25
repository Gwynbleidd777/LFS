// // Navigation.js
// import React from "react";
// import { NavLink } from "react-router-dom";

// const Navigation = ({ isAuthenticated, handleLogout }) => {
//   return (
//     <div className="menu transparent-menu">
//       <div className="name"></div>
//       <nav className="menuitems">
//         <ul className="nav-list">
//           {isAuthenticated ? (
//             <>
//               <li>
//                 <NavLink to="/ItemList" className="nav-menu nav-menu-animated">
//                   <i className="fa-solid fa-circle-info"></i>Lost & Found
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/profile" className="nav-menu nav-menu-animated">
//                   <i className="fa-solid fa-user"></i>My Profile
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/contact" className="nav-menu nav-menu-animated">
//                   <i className="fa-solid fa-address-book"></i>Contact Us
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/"
//                   className="nav-menu nav-menu-animated"
//                   onClick={handleLogout}
//                 >
//                   <i className="fa-solid fa-sign-out"></i>Logout
//                 </NavLink>
//               </li>
//             </>
//           ) : (
//             <>
//               <li>
//                 <NavLink to="/" className="nav-menu nav-menu-animated">
//                   <i className="fa-solid fa-house"></i>Home
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/login" className="nav-menu nav-menu-animated">
//                   <i className="fa-solid fa-right-to-bracket"></i>Login
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/signup" className="nav-menu nav-menu-animated">
//                   <i className="fa-solid fa-sign-up"></i>Sign Up
//                 </NavLink>
//               </li>
//             </>
//           )}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Navigation;
