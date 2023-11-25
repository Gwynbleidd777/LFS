import React from 'react';
import "./items.css";
import { Divider } from '@mui/material';

const List = () => {
  return (
    <div className='buynow_section'>
      <div className='buynow_container'>
      <div className='left_buy'>
      <h1>List Of Items</h1>
      <p>Select All Items</p>
      <span className='leftbuyprice'>Founded By Rajdeep Near Lab 2</span>
      <Divider />

      <div className='item_containert'>
      <img src='./item1.jpg' alt='item1'/>
      <div className='item_details'>
      <h3>Apple Watch</h3>
      <h3>Smart Watches</h3>
      <h3 className='diffrentprice'>$12</h3>
      <p className='unusall'>You've Claimed This Item.</p>
      </div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default List;
