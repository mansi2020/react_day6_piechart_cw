import React, { useState } from "react";
import "./Dropdown.css";

const Dropdown = (props) => {
  // usestate for selected value------------------------------------------>
  const [selectdVal, setSelectedVal] = useState("mans");

  // handleDropdown function---------------------------------------------->
  const handleDropdown = (e) => {
    setSelectedVal(e.target.value);
    props.onChangeFunction(e.target.value);
  };

  return (
    <div
      className="dropDownContainer"
      value={selectdVal}
      onChange={handleDropdown}
    >
      <p>Tenure</p>
      <select>
        <option value="5">5 years</option>
        <option value="10">10 years</option>
        <option value="15">15 years</option>
        <option value="20">20 years</option>
        <option value="25">25 years</option>
      </select>
    </div>
  );
};

export default Dropdown;
