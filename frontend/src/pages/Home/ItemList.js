import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Item from "../SingleItem/singleItem";
// import Tables from "../L&F Items/L&F";
import { useNavigate } from "react-router-dom";
import Spiner from "../../components/Spiner/Spiner";
import "./itemlist.css";
import { Divider, dividerClasses } from '@mui/material';

const Search = () => {
  const [showspin, setShowSpin] = useState(true);

  const navigate = useNavigate();

  const adduser = () => {
    navigate("/register");
  };

  useEffect(() => {
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, []);

  return (
    <>
      <div className="container">
        <div className="main_div">
          <div className="search_add mt-4 d-flex justify-content-center align-items-center">
            {/* Search Bar and Button */}
            <div className="search col-lg-10 d-flex justify-content-center">
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

            <div className="add_btn justify-content-right">
              {/* Add Item Button */}
              <Button variant="primary" onClick={adduser}>
                <i className="fa-solid fa-plus"></i>&nbsp; Add Item
              </Button>
            </div>
          </div>
          {/* <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            <div className="export_csv">
              <Button className="export_btn">Export To Csv</Button>
            </div>
            <div className="filter_gender">
              <div className="filter">
                <h3>Filter By Gender</h3>
                <div className="gender d-flex justify-content-between">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="gender"
                    value={"All"}
                    // onChange={(e)=>setGender(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"Male"}
                    //onChange={(e)=>setGender(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
                    //onChange={(e)=>setGender(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="filter_newold">
              <h3>Sort By Value</h3>
              <Dropdown className="text-center">
                <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                  <i class="fa-solid fa-sort"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>New</Dropdown.Item>
                  <Dropdown.Item>Old</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="filter_status">
              <div className="status">
                <h3>Filter By Status</h3>
                <div className="status_radio d-flex justify-content-between flex-wrap">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="status"
                    value={"All"}
                    //onChange={(e)=>setStatus(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Active`}
                    name="status"
                    value={"Active"}
                    //onChange={(e)=>setStatus(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`InActive`}
                    name="status"
                    value={"InActive"}
                    // onChange={(e)=>setStatus(e.target.value)}
                  />
                </div>
              </div>
            </div> 
          </div>*/}
        {showspin ? <Spiner /> : <Item />}
      </div>
      </div>
    </>
  );
};

export default Search;
