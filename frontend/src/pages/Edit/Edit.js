import React, { useEffect, useState } from 'react'
import Card from "react-bootstrap/card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Select from 'react-select'
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./edit.css"

const Edit = () => {

  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: ""
  });

    const [status, setStatus] = useState("Active");
    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("");

  const options = [
  { value: 'Active', label: 'Active' },
  { value: 'InActive', label: 'Inactive' },
]
const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value })
  }

  const setStatusValue = (e) => {
    setStatus(e.value)
  }

  
  const setProfile = (e) => {
    setImage(e.target.files[0])
  }

  const submitUserData = async(e) => {
    e.preventDefault();

    const { fname, lname, email, mobile, gender, location } = inputdata;
     if (fname === "") {
      toast.error("First name is Required !")
    } else if (lname === "") {
      toast.error("Last name is Required !")
    } else if (email === "") {
      toast.error("Email is Required !")
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email !")
    } else if (mobile === "") {
      toast.error("Mobile is Required !")
    } else if (mobile.length > 10) {
      toast.error("Enter Valid Mobile!f")
    } else if (gender === "") {
      toast.error("Gender is Required !")
    } else if (status === "") {
      toast.error("Status is Required !")
    } else if (image === "") {
      toast.error("Prfile is Required !")
    } else if (location === "") {
      toast.error("location is Required !")
    }else {
      toast.success("REGISTRATION HAS SUCCESSFULLY DONE ")
    }

  }

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image))
    }
 
  },[image])
  return (
    <>
   <div className='container'>
    <h2 className='text-center mt1'>Update Your Details</h2>
    <Card className='shadow mt-3 p-3' >
    <div className='profile_div text-center'>
      <img src={preview ? preview : "/man.png"} alt="img" />

    </div>

       <Form>
       <Row>

       <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" name='fname'  value={inputdata.fname} onChange={setInputValue} placeholder="Enter Your First Name" />
      </Form.Group>

      <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" name='lname' value={inputdata.lname}  onChange={setInputValue} placeholder="Enter Your Last Name" />
      </Form.Group>

      <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='email' value={inputdata.email} onChange={setInputValue}  placeholder="Enter Your Email" />
      </Form.Group>

      <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
        <Form.Label>Mobile Number </Form.Label>
        <Form.Control type="text" name='mobile' value={inputdata.mobile} onChange={setInputValue}  placeholder="Enter Your Mobile Number" />
      </Form.Group>

      <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Select Your Gender</Form.Label>
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"Male"}
                    onChange={setInputValue}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
                    onChange={setInputValue}
                  />
                </Form.Group>

                 <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Select Your Status</Form.Label>
                  <Select options={options} onChange={setStatusValue} />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
        <Form.Label>Select Your Profile</Form.Label>
        <Form.Control type="file" name='user_profile' onChange={setProfile} placeholder="Enter Your Profile" />
      </Form.Group>

      <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
        <Form.Label> Enter You Location </Form.Label>
        <Form.Control type="text" name='location' value={inputdata.location} onChange={setInputValue} placeholder="Enter Your Location" />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={submitUserData}>
        Submit
      </Button>
      </Row>
    </Form>
    </Card>
      <ToastContainer position="top-center"
/>
    </div>
      
    </>
  )
}

export default Edit

