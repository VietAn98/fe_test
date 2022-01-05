import React from "react";
import "./styles.scss";

const TITLES = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ",", "=", "+", "-", "x", "/", "%", "+/-", "AC"];

export default function Calculator() {
  const handleClickItem = (item: string) => {
    console.log(item);
  };

  return (
    <div className="calculator-container">
      <div className="result-container">
        <div className="three-dots ">
          <div className="dots red"></div>
          <div className="dots yellow"></div>
          <div className="dots green"></div>
        </div>
        <div id="results"></div>
      </div>
      <div className="parent">
        {TITLES.map((item, index) => (
          <div key={index} className={`div${index + 1}`} onClick={() => handleClickItem(item)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
