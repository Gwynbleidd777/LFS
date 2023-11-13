import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./home1.css";
import { Link } from 'react-router-dom';

const Home1 = () => {
  return (
    <>
      <div className='heade'>
        <h2>Welcome To Our Lost And Found System</h2>
      </div>
      <div className='row'>
        <div className='topl col-lg-6'>
          <img src='./img5.jpg' alt='img' height={"350px"} width={"500px"}/>
        </div>
        <div className='topr col-lg-6'>
          <h1>LOST & FOUND</h1>
          <h2>Lost It. List It. Find It.</h2>
        </div>
      </div>
      <div className='mid'>
        <h3>Objectives Of Our Project</h3>
      </div>
      <div className='row row-width-space'>
        <div className='col-lg-4 col-md-6 col-sm-12 mb-3'>
          <Card className='card-style'>
          <Card.Img variant="top" src="./img6.jpg" />
            <Card.Body>
              <Card.Title className='card-title'>User-Friendly Interface</Card.Title>
              <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
              <Card.Text>
              A user-friendly interface simplifies reporting lost and found items. It offers intuitive navigation, mobile accessibility, clear feedback, and an attractive design, ensuring a seamless user experience.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className='col-lg-4 col-md-6 col-sm-12 mb-3'>
          <Card className='card-style' >
          <Card.Img variant="top" src="./img9.jpg" />
            <Card.Body>
              <Card.Title className='card-title'>User Profiles</Card.Title>
              <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
              <Card.Text>
              Empower users with dedicated profiles to efficiently oversee their reported lost and found possessions, enhancing control and engagement with the platform.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
         <div className='col-lg-4 col-md-6 col-sm-12 mb-3'>
          <Card className='card-style'>
          <Card.Img variant="top" src="./img8.jpg" />
            <Card.Body>
              <Card.Title className='card-title'>Item Registration</Card.Title>
              <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
              <Card.Text>
               System for users to register lost items with detailed descriptions, including photos, location, and date of loss. Similar registration process for found items, allowing finders to provide relevant information.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className='row'>
        <div className='mil col-lg-6'>
          <h3>Our Insipiration</h3>
          <p className="inspiration-text">We have seen many of our useful gadget which are precious to us were some times lost and we are unable to find those things from this our team got
           inspiration for making such website where people can find their lost items</p>
        </div>
        <div className='mir col-lg-6'>
        <img src='./img1.jpg' alt='..'></img>
        </div>
        </div>
      </div>

      <div className='works-container'>
  <div className='works'>
    <h2>How It Works ?</h2>
  </div>
  <div className='row'>
      <div className='col-lg-4 col-md-6 col-sm-12 mb-3'>
      <Card className='card-style'>
      <Card.Img variant="top" src="./img4.jpg" />
      <Card.Body>
        <Card.Title>Create An Account</Card.Title>
        <Card.Text>
        To begin, create an account for access to our platform's features and services, making it easy to manage lost and found items effectively.
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
    <div className='col-lg-4 col-md-6 col-sm-12 mb-3'>
    <Card className='card-style'>
      <Card.Img variant="top" src="./img2.jpg" />
      <Card.Body>
        <Card.Title>List Your Items</Card.Title>
        <Card.Text>
        Easily list your lost or found items by providing essential details and images. Streamlined, hassle-free, and efficient.
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


<div className='row mt-5'>
  <div className='botr col-lg-6 col-sm-12 mb-3'>
    <div className="contact-form">
      <h2>Contact Us</h2>
      <p>If you have any questions or feedback, please don't hesitate to get in touch with us.</p>
    </div>
  </div>
  <div className='botl col-lg-6 col-sm-12 mb-3'>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Your Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter Your Email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Message</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </div>
</div>

    </>
  );
}

export default Home1;