import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token"); // Check the user's authentication status

  const [isEditable, setIsEditable] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    // ... other fields you have in the database
  });

  // If the user is not authenticated, redirect them to the login page
  // Inside the useEffect hook
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/userData");
        const data = await response.json();
        setUserData(data); // Set the user data received from the API

        // Also set the initial state of editedData here
        setEditedData(data); // Set the same data for editedData initially
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const [editedData, setEditedData] = useState({ ...userData });

  const handleFieldChange = (field, value) => {
    const updatedData = {
      ...editedData,
      [field]: value,
    };

    setEditedData(updatedData);
    console.log("Edited Data:", updatedData); // Log the updatedData state
  };

  const updateUserProfile = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/updateProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editedData), // Send editedData to update the profile
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("User data updated successfully");

        // Update the userData state to reflect the changes
        setUserData({
          ...userData,
          ...editedData,
        });

        // Set isEditable to false to exit the edit mode
        setIsEditable(false);
      } else {
        console.error("Failed to update user data:", responseData.message);
        // Handle specific error scenarios based on the response data
      }
    } catch (error) {
      console.error("Error updating user data:", error.message);
      // Handle network failures or other exceptions here
    }
  };

  const handleEditClick = () => {
    setIsEditable(!isEditable); // Toggle the isEditable state
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <img src="./Mohit.jpg" alt="Profile" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Hi {`${userData.firstName}`} !</h5>
              <p className="card-text">Your Bio</p>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">My Profile</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="nameInput" className="form-label">
                    Name :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameInput"
                    value={`${userData.firstName || ""} ${
                      userData.lastName || ""
                    }`}
                    readOnly={!isEditable}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="addressInput" className="form-label">
                    Address:
                  </label>
                  {isEditable ? (
                    <input
                      type="text"
                      className="form-control"
                      id="addressInput"
                      value={
                        editedData.address || (userData ? userData.address : "")
                      }
                      onChange={(e) =>
                        handleFieldChange("address", e.target.value)
                      }
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      id="addressInput"
                      value={userData ? userData.address : ""}
                      readOnly={!isEditable}
                    />
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="phoneNumberInput" className="form-label">
                    Phone Number:
                  </label>
                  {isEditable ? (
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNumberInput"
                      value={
                        editedData.phoneNumber ||
                        (userData ? userData.phoneNumber : "")
                      }
                      onChange={(e) =>
                        handleFieldChange("phoneNumber", e.target.value)
                      }
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNumberInput"
                      value={userData ? userData.phoneNumber : ""}
                      readOnly={!isEditable}
                    />
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="emailInput" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    value={userData ? userData.email : ""}
                    readOnly={!isEditable}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="dobInput" className="form-label">
                    Date Of Birth:
                  </label>
                  {isEditable ? (
                    <input
                      type="date"
                      className="form-control"
                      id="dobInput"
                      value={editedData.dob || (userData ? userData.dob : "")}
                      onChange={(e) => handleFieldChange("dob", e.target.value)}
                    />
                  ) : (
                    <input
                      type="date"
                      className="form-control"
                      id="dobInput"
                      value={userData ? userData.dob : ""}
                      readOnly={!isEditable}
                    />
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="genderInput" className="form-label">
                    Gender:
                  </label>
                  {isEditable ? (
                    <select
                      className="form-select"
                      id="genderInput"
                      value={
                        editedData.gender || (userData ? userData.gender : "")
                      }
                      onChange={(e) =>
                        handleFieldChange("gender", e.target.value)
                      }
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
                      <option value="Prefer Not To Say">
                        Prefer Not To Say
                      </option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      id="genderInput"
                      value={userData ? userData.gender : ""}
                      readOnly={!isEditable}
                      onChange={(e) =>
                        handleFieldChange("gender", e.target.value)
                      }
                    />
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="departmentInput" className="form-label">
                    Department:
                  </label>
                  {isEditable ? (
                    <input
                      type="text"
                      className="form-control"
                      id="departmentInput"
                      value={
                        editedData.department ||
                        (userData ? userData.department : "")
                      }
                      onChange={(e) =>
                        handleFieldChange("department", e.target.value)
                      }
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      id="departmentInput"
                      value={userData ? userData.department : ""}
                      readOnly={!isEditable}
                    />
                  )}
                </div>

                <div className="text-center mt-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-container">
                      <a
                        href="#"
                        className={`btn btn-primary ${
                          isEditable ? "slideRight" : "slideLeft"
                        }`}
                        onClick={() => {
                          handleEditClick();
                          if (isEditable) {
                            updateUserProfile(); // Call function to update user profile when Save Changes is clicked
                          }
                        }}
                      >
                        {isEditable ? "Save Changes" : "Edit Profile"}
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
