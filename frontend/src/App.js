import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Headers/Headers";
import Footers from './components/Footers/Footer';
// import Search from "./pages/Home/ItemList";
import Register from "./pages/Register/Register";
import Edit from "./pages/Edit/Edit";
import Profile from "./pages/Profile/Profile";
// import Tables from './pages/L&F Items/L&F';
import Home1 from './pages/Home1/Home1';
import Contact from './pages/Contact/Contact';
import Main from './components/Main';
import Signup from './components/Signup';
import Login from './components/Login';
import EmailVerify from './components/EmailVerify';
import ForgotPassword from './components/ForgotPassword';
import PasswordReset from './components/PasswordReset';
import Item from './pages/SingleItem/singleItem';
// import Buynow from './pages/SingleItem/singleItem';

function App() {
  const user = localStorage.getItem("token");
  const navigate = useNavigate();

  // Function to handle logout and redirect to the home page
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the user token
    navigate("/", { replace: true }); // Redirect to the home page immediately without adding to the history
  };
  

  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={user ? <Main handleLogout={handleLogout} /> : <Home1 />} />
        {user && <Route path='/register' element={<Register />} />}
        {user && <Route path='/edit/:id' element={<Edit />} />}
        {user && <Route path='/profile' element={<Profile />} />}
        {user && <Route path="/ItemList" element={<Item />} />}
        {user && <Route path='/lost&found/:id' element={<Item />} />}
        {user && <Route path='/contact' element={<Contact />} />}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/password-reset/:id/:token" element={<PasswordReset/>} />
      </Routes>
      <Footers />
    </>
  );
}

export default App;