import React, { useState } from "react";
import "./contact.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/contact/submit",
        formData
      );
      console.log("Form submitted:", response.data);
      setShowSuccessMessage(true);
      // Reset form fields after successful submission
      setFormData({ name: "", email: "", message: "" });
      // Handle success: Display a success message or perform any necessary actions
    } catch (error) {
      console.error("Error submitting form:", error.message);
      // Handle error: Display an error message or perform any necessary actions
    }
  };

  const closeSuccessMessage = () => {
    setShowSuccessMessage(false); // Hide success message on close
  };

  return (
    <>
      <div className="head">
        <h1 align="center">Contact Us</h1>
      </div>
      <div className="containers">
        {/* Mapping through the data to create cards */}
        {[
          {
            name: "Rajdeep Biswas",
            email: "biswasrajdeep.2604@gmail.com",
            phone: "+91 6290661807",
            imgSrc: "/Ranjdeep.jpg",
          },
          {
            name: "Animesh Kumar Sur",
            email: "animeshsur900@gmail.com",
            phone: "+91 7061523594",
            imgSrc: "/Arsola2.jpg",
          },
          {
            name: "Mohit Das",
            email: "mohitofcl7@gmail.com",
            phone: "+91 7003961588",
            imgSrc: "/Mohit.jpg",
          },
          {
            name: "Dip Kumar Chowdhury",
            email: "dipch1629@gmail.com",
            phone: "+91 9748367492",
            imgSrc: "/PokPok.jpg",
          },
          // Add data for other project members similarly...
        ].map((member, index) => (
          <Card
            className="card-profile shadow col-lg-3 mx-auto mt-5"
            key={index}
          >
            <div className="image-container">
              <Card.Img variant="top" src={member.imgSrc} alt="img" />
            </div>
            <hr className="divider" />
            <div className="text-center">
              <span>
                <b>{member.name}</b>
              </span>
              <h6>
                <i className="fa-solid fa-envelope email"></i>&nbsp;:-{" "}
                {member.email}
              </h6>
              <h6>
                <i className="fa-solid fa-mobile"></i>&nbsp;:-{" "}
                <span>{member.phone}</span>
              </h6>
            </div>
          </Card>
        ))}
      </div>
      {/* Divider between the cards and the contact form */}
      <hr className="custom-divider" />
      <div className="row row-width-space">
        <div className="col-lg-6 col-sm-12 mb-3">
          <div className="botl">
            <h3>Contact Admin</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label className="pl-3">Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="pl-3">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="pl-3">Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>

        {/* Success message modal */}
        <Modal
          show={showSuccessMessage}
          onHide={closeSuccessMessage}
          centered // To center the modal vertically
        >
          <Modal.Header closeButton={false}>
            <Modal.Title className="text-center mb-4">Thanks ! :)</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            Your Message Has Been Successfully Sent To The Admin. You'll Soon
            Get A Response From Him On Your Provided Email.<p>Stay Tuned !</p>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <Button
              variant="primary"
              onClick={closeSuccessMessage}
              className="btn-submit"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="col-lg-6 col-sm-12 mb-3">
          <div className="botr">
            <Card className="card-admin">
              <Card.Img variant="top" src="./img9.jpg" />
              <Card.Body>
                <Card.Title>Feel Free To Drop A Feedback !</Card.Title>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
