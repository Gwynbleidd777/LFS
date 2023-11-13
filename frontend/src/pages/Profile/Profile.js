import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token'); // Check the user's authentication status

  // If the user is not authenticated, redirect them to the login page
  if (!isAuthenticated) {
    navigate('/login');
  }

  // Sample user information (you can replace this with actual user data)
  const user = {
    name: 'John Doe',
    address: '123 Main St, City, Country',
    phoneNumber: '+1 (123) 456-7890',
    // Add more user details here
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <img src="your-profile-image.jpg" alt="Profile" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">Your Bio</p>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">My Profile</h2>
              <ul className="list-group">
                <li className="list-group-item">
                  <strong>Name:</strong> {user.name}
                </li>
                <li className="list-group-item">
                  <strong>Address:</strong> {user.address}
                </li>
                <li className="list-group-item">
                  <strong>Phone Number:</strong> {user.phoneNumber}
                </li>
                {/* Add more user details as needed */}
              </ul>
              <a href="#" className="btn btn-primary">Edit Profile</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
