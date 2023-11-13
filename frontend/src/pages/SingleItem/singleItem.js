import { Divider, dividerClasses } from "@mui/material";
import React from "react";
import "./singleItem.css";

const Item = () => {
  return (
    <div className="cart_section">
      <div className="cart_container">
        <div className="left_cart">
          <img src="./item1.jpg" alt="cart_img" />
          <div className="cart_btn">
            <button className="cart_btn1">Claim Item</button>
          </div>
        </div>
        <div className="right_cart">
          <h3>Apple Watch</h3>
          <h4>Lost It Near Ranjdeep's Lab !!!</h4>
          <Divider  />
          <p className="mrp">M.R.P. : $12</p>
          <p>
            Deal Of The Day : <span style={{ color: "#B12704" }}>$9</span>
          </p>
          <p>
            You Save : <span style={{ color: "#B12704" }}>$3 (25%)</span>
          </p>

          <div className="discount_box">
            <h5>
              Discount : <span style={{ color: "#111" }}>Extra 10% Off</span>
            </h5>
            <h4>
              Free Delivery :{" "}
              <span style={{ color: "#111", fontWeight: 600 }}>Oct 8 - 21</span>
              Details
            </h4>
            <p>
              Fastest Delivery :{" "}
              <span style={{ color: "#111" }}>Tomorrow 11 AM</span>
            </p>
          </div>
          <p className="description">
            About The Item :{" "}
            <span
              style={{
                color: "#565959",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.4px",
              }}
            >
              My Watch Has A Scratch In It's Right Corner.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Item;
