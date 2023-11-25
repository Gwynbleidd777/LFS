import { Divider, dividerClasses } from "@mui/material";
import React from "react";
import "./singleItem.css";

const Item = () => {
  return (
    <div className="cart_section">
      <div className="cart_container">
        <div className="left_cart">
          <img src="./img-8672.webp" alt="cart_img" />
          <div className="cart_btn">
            <button className="cart_btn1">Claim Item</button>
          </div>
        </div>
        <div className="right_cart">
          <h3>Apple Watch</h3>
          <h4>Found It Near Staff Room !!!</h4>
          <Divider  />
          <p className="mrp">Color : Black</p>
          <p>
            Brand : <span style={{ color: "#B12704" }}>Apple</span>
          </p>
          <p>
            Model : <span style={{ color: "#B12704" }}>Apple Watch Series 9 GPS</span>
          </p>

          <div className="discount_box">
            <h5>
              Item Type : <span style={{ color: "#111" }}>Found</span>
            </h5>
            <h4>
              Posted By :{" "}
              <span style={{ color: "#111", fontWeight: 600 }}>Dipok Adhikary</span>
              
            </h4>
            {/* <p>
              Fastest Delivery :{" "}
              <span style={{ color: "#111" }}>Tomorrow 11 AM</span>
            </p> */}
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
              The Watch Has A Scratch In It's Right Corner.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Item;
