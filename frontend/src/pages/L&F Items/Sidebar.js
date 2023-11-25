import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [watchChecked, setWatchChecked] = useState(false);
  const [mobileChecked, setMobileChecked] = useState(false);
  const [headphoneChecked, setHeadphoneChecked] = useState(false);
  const [othersChecked, setOthersChecked] = useState(false);

  const handleWatchChange = () => {
    setWatchChecked(!watchChecked);
  };

  const handleMobileChange = () => {
    setMobileChecked(!mobileChecked);
  };

  const handleHeadphoneChange = () => {
    setHeadphoneChecked(!headphoneChecked);
  }

  const handleOthersChange = () => {
    setOthersChecked(!othersChecked);
  };

    const [colorCheckboxes, setColorCheckboxes] = useState({
      red: false,
      blue: false,
      green: false,
      yellow: false,
      purple: false,
    });

    const handleColorChange = (color) => {
      setColorCheckboxes({
        ...colorCheckboxes,
        [color]: !colorCheckboxes[color],
      });
    };

  return (
    <div
      className="col-md-3 col-lg-2 sidebar-offcanvas pl-0"
      id="sidebar"
      role="navigation"
      style={{ backgroundColor: "#e9ecef" }}
    >
      <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
        <li className="nav-item mb-2">
          <Link to="/" className="nav-link text-secondary">
            <i className="far fa-file-word font-weight-bold"></i>{" "}
            <span className="ml-3">Categories</span>
          </Link>
          <div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="watchCheckbox"
                checked={watchChecked}
                onChange={handleWatchChange}
              />
              <label className="form-check-label" htmlFor="watchCheckbox">
                Watches
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="mobileCheckbox"
                checked={mobileChecked}
                onChange={handleMobileChange}
              />
              <label className="form-check-label" htmlFor="mobileCheckbox">
                Mobile
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="headphoneCheckbox"
                checked={headphoneChecked}
                onChange={handleHeadphoneChange}
              />
              <label className="form-check-label" htmlFor="mobileCheckbox">
                Headphones
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="othersCheckbox"
                checked={othersChecked}
                onChange={handleOthersChange}
              />
              <label className="form-check-label" htmlFor="othersCheckbox">
                Others
              </label>
            </div>
          </div>
        </li>
        <li className="nav-item mb-2">
          <Link to="/item" className="nav-link text-secondary">
            <i class="fa-solid fa-palette font-weight-bold"></i>
            <span className="ml-3">Colour</span>
          </Link>
          <div className="mt-3">
            <span className="d-block mb-2">Color Categories:</span>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="redCheckbox"
                checked={colorCheckboxes.red}
                onChange={() => handleColorChange("red")}
              />
              <label className="form-check-label" htmlFor="redCheckbox">
                Red
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="blueCheckbox"
                checked={colorCheckboxes.blue}
                onChange={() => handleColorChange("blue")}
              />
              <label className="form-check-label" htmlFor="blueCheckbox">
                Blue
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="greenCheckbox"
                checked={colorCheckboxes.green}
                onChange={() => handleColorChange("green")}
              />
              <label className="form-check-label" htmlFor="greenCheckbox">
                Green
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="yellowCheckbox"
                checked={colorCheckboxes.yellow}
                onChange={() => handleColorChange("yellow")}
              />
              <label className="form-check-label" htmlFor="yellowCheckbox">
                Yellow
              </label>
            </div>
            {/* Similar code for other color checkboxes */}
          </div>
        </li>
        {/* ... other sidebar items */}
      </ul>
    </div>
  );
};

export default Sidebar;
