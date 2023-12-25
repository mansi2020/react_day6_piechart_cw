import React, { useState } from "react";
import "./Slider.css";

const Slider = (props) => {
  const [rangeVal, setRangeVal] = useState(0);
  // onchange range
  const onChnageRange = (e) => {
    setRangeVal(e.target.value);
    //   change loan amount according down payment and  home value
    props.onChangeFunction(e.target.value);
  };

  return (
    <div className="sliderNameContainer">
      <h4>{props.title}</h4>
      <h2>
      {props.showPercentage == true ? "%" : "$"}
        {props.value}
      </h2>
      <input
        type="range"
        min={props.min}
        max={props.max}
        onChange={onChnageRange}
        step={props.showPercentageRange == true ? "1" : "100"}
        value={props.value}
      />
      <div className="sliderMinMax">
        <p>
          {props.showPercentage == true ? "%" : "$"} {props.min}
        </p>
        <p>
          {props.showPercentage == true ? "%" : "$"} {props.max}
        </p>
      </div>
    </div>
  );
};

export default Slider;
