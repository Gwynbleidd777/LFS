import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Pagination,
} from "react-bootstrap";
import "./userdashboard.css";
import { bold } from "colors";

const UserDashboard = () => {
  // Dummy data for cards
  const items = [
    { id: 1, name: "Item 1", location: "Near ABC", image: "Arsola.jpg" },
    { id: 2, name: "Item 2", location: "Near XYZ", image: "Arsola2.jpg" },
    { id: 3, name: "Item 1", location: "Near ABC", image: "bluetooth.jpg" },
    { id: 4, name: "Item 2", location: "Near XYZ", image: "earrings.jpg" },
    { id: 5, name: "Item 1", location: "Near ABC", image: "headphones1.webp" },
    { id: 6, name: "Item 2", location: "Near XYZ", image: "headphones2.webp" },
    { id: 7, name: "Item 1", location: "Near ABC", image: "img-8672.webp" },
    { id: 8, name: "Item 2", location: "Near XYZ", image: "item1.jpg" },
    { id: 9, name: "Item 1", location: "Near ABC", image: "Mangekeyo.jpg" },
    { id: 10, name: "Item 2", location: "Near XYZ", image: "phone1.webp" },
    { id: 11, name: "Item 1", location: "Near ABC", image: "phone2.jpg" },
    { id: 12, name: "Item 2", location: "Near XYZ", image: "PokPok.jpg" },
    { id: 13, name: "Item 1", location: "Near ABC", image: "Ranjdeep.jpg" },
    { id: 14, name: "Item 2", location: "Near XYZ", image: "Rinnegan.png" },
    { id: 15, name: "Item 1", location: "Near ABC", image: "watch2.webp" },
    { id: 16, name: "Item 2", location: "Near XYZ", image: "watch1.webp" },
    // ... More items
  ];

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={3}>
          {/* Filter options */}
          <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label className="category-label">Category</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Watch"
                  name="filterOptions"
                  id="watch"
                />
                <Form.Check
                  type="radio"
                  label="Purse/Money Bag"
                  name="filterOptions"
                  id="purse"
                />
                <Form.Check
                  type="radio"
                  label="Cards"
                  name="filterOptions"
                  id="cards"
                />
                <Form.Check
                  type="radio"
                  label="Phone"
                  name="filterOptions"
                  id="phone"
                />
                <Form.Check
                  type="radio"
                  label="Phone Cover"
                  name="filterOptions"
                  id="phoneCover"
                />
                <Form.Check
                  type="radio"
                  label="Earphones"
                  name="filterOptions"
                  id="earphones"
                />
                <Form.Check
                  type="radio"
                  label="Books"
                  name="filterOptions"
                  id="books"
                />
                <Form.Check
                  type="radio"
                  label="Keyboard/Mouse/Other Similar Gadgets"
                  name="filterOptions"
                  id="keyboard"
                />
                <Form.Check
                  type="radio"
                  label="Charger"
                  name="filterOptions"
                  id="charger"
                />
                <Form.Check
                  type="radio"
                  label="Glasses/Spectacles"
                  name="filterOptions"
                  id="glasses"
                />
                <Form.Check
                  type="radio"
                  label="Speaker"
                  name="filterOptions"
                  id="speaker"
                />
                <Form.Check
                  type="radio"
                  label="Lunch Box/Bottle"
                  name="filterOptions"
                  id="lunchBox"
                />
                <Form.Check
                  type="radio"
                  label="Pen Drive/USB/Similar Gadgets"
                  name="filterOptions"
                  id="penDrive"
                />
                <Form.Check
                  type="radio"
                  label="Make-up Kit"
                  name="filterOptions"
                  id="makeupKit"
                />
                <Form.Check
                  type="radio"
                  label="Jewellery/Chains/Rings/Similar Items"
                  name="filterOptions"
                  id="jewellery"
                />
                <Form.Check
                  type="radio"
                  label="Outfit"
                  name="filterOptions"
                  id="outfit"
                />
                <Form.Check
                  type="radio"
                  label="Others"
                  name="filterOptions"
                  id="others"
                />
              </div>
            </Form.Group>
          </Form>
        </Col>

        {/* Item List */}
        <Col md={9}>
          {/* Search bar and Add Item button */}
          <Form className="mb-3">
            <Row>
              <Col md={8}>
                <Form.Control type="text" placeholder="Search..." />
              </Col>
              <Col md={4} className="text-right">
                <Button variant="primary">Add Item</Button>
              </Col>
            </Row>
          </Form>

          {/* Display Cards */}
          <Row>
            {items.map((item) => (
              <Col key={item.id} md={3} className="mb-3">
                <Card className="fixed-height-card">
                  <div
                    className="card-image"
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{`Lost/Found it ${item.location}`}</Card.Text>
                    <Button variant="primary">View Item</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          <Row>
            <Col className="text-center">
              <Pagination>
                <Pagination.Prev />
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Next />
              </Pagination>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;
