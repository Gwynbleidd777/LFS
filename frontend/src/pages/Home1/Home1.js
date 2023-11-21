import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "./home1.css";
import { Link } from "react-router-dom";

const Home1 = () => {
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
      <div className="heade">
        <h2>Welcome To Our Lost And Found System</h2>
      </div>
      <div className="row">
        <div className="topl col-lg-6">
          <img src="./img5.jpg" alt="img" height={"350px"} width={"500px"} />
        </div>
        <div className="topr col-lg-6">
          <h1>LOST & FOUND</h1>
          <h2>Lost It. List It. Find It.</h2>
        </div>
      </div>
      <div className="mid">
        <h3>Objectives Of Our Project</h3>
      </div>
      <div className="row row-width-space">
        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
          <Card className="card-style">
            <Card.Img variant="top" src="./img6.jpg" />
            <Card.Body>
              <Card.Title className="card-title">
                User-Friendly Interface
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
              <Card.Text>
                A User-Friendly Interface Simplifies Reporting Lost And Found
                Items. It Offers Intuitive Navigation, Mobile Accessibility,
                Clear Feedback, And An Attractive Design, Ensuring A Seamless
                User Experience.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
          <Card className="card-style">
            <Card.Img variant="top" src="./img9.jpg" />
            <Card.Body>
              <Card.Title className="card-title">User Profiles</Card.Title>
              <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
              <Card.Text>
                Empower Users With Dedicated Profiles To Efficiently Oversee
                Their Reported Lost And Found Possessions, Enhancing Control And
                Engagement With The Platform.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
          <Card className="card-style">
            <Card.Img variant="top" src="./img8.jpg" />
            <Card.Body>
              <Card.Title className="card-title">Item Registration</Card.Title>
              <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
              <Card.Text>
                System For Users To Register Lost Items With Detailed
                Descriptions, Including Photos, Location, And Date Of Loss.
                Similar Registration Process For Found Items, Allowing Finders
                To Provide Relevant Information.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="row">
          <div className="mil col-lg-6">
            <h3>Our Insipiration</h3>
            <p className="inspiration-text">
              Cue The Lightbulb Moment ! We Were Struck With Inspiration To Craft
              A Website For Locating Lost Treasures After Our Beloved Gadgets
              Kept Vanishing Into Thin Air. Time To Find And Reclaim Your Prized
              Possessions !
            </p>
          </div>
          <div className="mir col-lg-6">
            <img src="./img1.jpg" alt=".."></img>
          </div>
        </div>
      </div>

      <div className="works-container">
        <div className="works">
          <h2>How It Works ?</h2>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <Card className="card-style">
              <Card.Img variant="top" src="./img4.jpg" />
              <Card.Body>
                <Card.Title>Create An Account</Card.Title>
                <Card.Text>
                  To Begin, Create An Account For Access To Our Platform's
                  Features And Services, Making It Easy To Manage Lost And Found
                  Items Effectively.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <Card className="card-style">
              <Card.Img variant="top" src="./img2.jpg" />
              <Card.Body>
                <Card.Title>List Your Items</Card.Title>
                <Card.Text>
                  Easily List Your Lost Or Found Items By Providing Essential
                  Details And Images. Streamlined, Hassle-Free, And Efficient.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      <div className="bot text-center mt-5">
        <Link to="/signup">
          <Button variant="outline-info" className="get-started-button">
            Get Started
          </Button>
        </Link>
      </div>

      <div className="row mt-5">
        <div className="botr col-lg-6 col-sm-12 mb-3">
          <div className="contact-form">
            <h2>Contact Us</h2>
            <p>
              If You Have Any Questions Or Feedback, Feel Free To Ask Or Give In
              The Form To Your Right :)
            </p>
          </div>
        </div>
        <div className="botl col-lg-6 col-sm-12 mb-3">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
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
              <Form.Label>Message</Form.Label>
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
          We Have Got Your Message And Believe Us, We Are Already On Our Way In
          Reaching You Out. Keep An Eye On Your Email.
          <p>Stay Tuned !</p>
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
    </>
  );
};

export default Home1;
