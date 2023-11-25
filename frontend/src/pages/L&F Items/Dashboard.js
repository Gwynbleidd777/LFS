import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import './dashboard.css'

const Dashboard = () => {
  return (
    <div className="col main pt-5 mt-3">
      <div className="container">
        <div className="main_div">
          <div className="search_add mt-4 d-flex justify-content-between align-items-center">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="success" className="search_btn">
                  Search
                </Button>
              </Form>
            </div>
            <div className="add_btn">
              <Button variant="primary">
                <i className="fa-solid fa-plus"></i>&nbsp; Add Item
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Row className="mb-3">
        <Col xl={3} sm={6} py={2} className="mb-4">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="Wwatch1.webp" className="custom-card-image" />
            <Card.Body>
              <Card.Title>Watches</Card.Title>
              <Card.Text>Found Near Main Gate</Card.Text>
              <Button variant="primary">View Now</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} sm={6} py={2} className="mb-4">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="watch2.webp" className="custom-card-image" />
            <Card.Body>
              <Card.Title>Watches</Card.Title>
              <Card.Text>Lost At Computer Lab 2</Card.Text>
              <Button variant="primary">View Now</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} sm={6} py={2} className="mb-4">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="phone1.webp" className="custom-card-image" />
            <Card.Body>
              <Card.Title>Mobile</Card.Title>
              <Card.Text>Lost At Computer Lab 2.</Card.Text>
              <Button variant="primary">View Now</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} sm={6} py={2} className="mb-4">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="phone2.jpg" className="custom-card-image" />
            <Card.Body>
              <Card.Title>Mobile</Card.Title>
              <Card.Text>Lost At Computer Lab 2.</Card.Text>
              <Button variant="primary">View Now</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} sm={6} py={2} className="mb-4">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="headphones1.webp" className="custom-card-image" />
            <Card.Body>
              <Card.Title>Headphones</Card.Title>
              <Card.Text>Lost At Computer Lab 2.</Card.Text>
              <Button variant="primary">View Now</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} sm={6} py={2} className="mb-4">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="headphones2.webp" className="custom-card-image" />
            <Card.Body>
              <Card.Title>Headphones</Card.Title>
              <Card.Text>Found Near Main Gate.</Card.Text>
              <Button variant="primary">View Now</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} sm={6} py={2} className="mb-4">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="bluetooth.jpg" className="custom-card-image" />
            <Card.Body>
              <Card.Title>Bluetooth</Card.Title>
              <Card.Text>Found It Near Main Gate.</Card.Text>
              <Button variant="primary">View Now</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} sm={6} py={2} className="mb-4">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="earrings.jpg" className="custom-card-image" />
            <Card.Body>
              <Card.Title>Earrings</Card.Title>
              <Card.Text>Found It Near Main Gate.</Card.Text>
              <Button variant="primary">View Now</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="d-flex justify-content-end">
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    </div>


  );
};

export default Dashboard;
