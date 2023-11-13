import React from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './l&f.css';
import './img1.jpg';

const Tables = () => {
  return (
    <div className="container">
      <Row>
        <Card className="shadow">
          <div className="cart-item">
            <div className="item-image">
              <img src="/man.png" alt="Item" />
            </div>
            <div className="item-details">
              <h5>Moto E-6s</h5>
              <p>Posted By: Dip Kumar</p>
              <p>Date: 12/12/23</p>
              <div className="item-status">
                <Button variant="primary">Found</Button>
              </div>
              <div className="item-info">
                <h3>
                  <i className="fa-solid fa-circle-info"></i>
                </h3>
              </div>
            </div>
          </div>
          <div className="cart-item">
            <div className="item-image">
              <img src="/img1.jpg" alt="Item" />
            </div>
            <div className="item-details">
              <h5>Charger</h5>
              <p>Posted By: Rohan</p>
              <p>Date: 1/7/23</p>
              <div className="item-status">
                <Button variant="danger">Lost</Button>
              </div>
              <div className="item-info">
                <h3>
                  <i className="fa-solid fa-circle-info"></i>
                </h3>
              </div>
            </div>
          </div>
        </Card>
      </Row>
    </div>
  );
};

export default Tables;
