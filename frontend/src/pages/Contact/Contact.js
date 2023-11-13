import React from 'react';
import "./contact.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row"

const Contact = () => {
  return (
    <>
   
      <div className='head'>
        <h1 align="center">CONTACT US </h1>
      </div>
      <div className="containers">
    <Card className='card-profile shadow col-lg-3 mx-auto mt-5' style={{ backgroundColor: '#95BDFF' }}>
      <Card.Body>
        <Row>
          <div className='col'>
            <div className='card-profile-stats d-flex justify-content-center'>
              <img src='/man.png' alt='img' />
            </div>
          </div>
        </Row>
        <div className='text-center'>
          <span><i><b>Rajdeep Biswas</b></i></span>
                <h6><i class="fa-solid fa-envelope email"></i>&nbsp;:- example@gmail.com</h6>
                <h6><i class="fa-solid fa-mobile"></i>&nbsp;:- <span>1234567890</span> </h6>
                
        </div>
      </Card.Body>
    </Card>
    <Card className='card-profile shadow col-lg-3 mx-auto mt-5' style={{ backgroundColor: '#FFF6BD' }}>
      <Card.Body>
        <Row>
          <div className='col'>
            <div className='card-profile-stats d-flex justify-content-center'>
              <img src='/man.png' alt='img' />
            </div>
          </div>
        </Row>
        <div className='text-center'>
          <span><i><b>Animesh Kumar Sur</b></i></span>
          <h6><i class="fa-solid fa-envelope email"></i>&nbsp;:- example@gmail.com</h6>
                <h6><i class="fa-solid fa-mobile"></i>&nbsp;:- <span>1234567890</span> </h6>
        </div>
      </Card.Body>
    </Card>
     <Card className='card-profile shadow col-lg-3 mx-auto mt-5' style={{ backgroundColor: '#FFDEDE' }}>
      <Card.Body>
        <Row>
          <div className='col'>
            <div className='card-profile-stats d-flex justify-content-center'>
              <img src='/man.png' alt='img' />
            </div>
          </div>
        </Row>
        <div className='text-center'>
          <span><i><b>Mohit Das</b></i></span>
          <h6><i class="fa-solid fa-envelope email"></i>&nbsp;:- example@gmail.com</h6>
                <h6><i class="fa-solid fa-mobile"></i>&nbsp;:- <span>1234567890</span> </h6>
        </div>
      </Card.Body>
    </Card>
     <Card className='card-profile shadow col-lg-4 mx-auto mt-5' style={{ backgroundColor: '#96C291' }}>
      <Card.Body>
        <Row>
          <div className='col'>
            <div className='card-profile-stats d-flex justify-content-center'>
              <img src='/man.png' alt='img' />
            </div>
          </div>
        </Row>
        <div className='text-center'>
          <span><i><b>Dip Kumar Chowdhuri</b></i></span>
          <h6><i class="fa-solid fa-envelope email"></i>&nbsp;:- example@gmail.com</h6>
            <h6><i class="fa-solid fa-mobile"></i>&nbsp;:- <span>1234567890</span> </h6>
        </div>
      </Card.Body>
    </Card>
    
   </div>
       <div className='headS'>
        <h5 align="center">CALL ANY PEERSON FROM HERE </h5>
      </div>
    </>
  )
}

export default Contact
