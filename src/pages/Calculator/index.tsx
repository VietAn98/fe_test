import React, { useState } from "react";
import "./styles.scss";

const TITLES = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ",", "=", "+", "-", "*", "/", "%", "+/-", "AC"];

export default function Calculator() {
  const [result, setResult] = useState("0");
  const [saveNumbers, setSaveNumbers] = useState("");
  const [savedLocalstorage, setSavedLocalstorage] = useState<string[]>();
  const [smallCalculation, setSmallCalculation] = useState("");

  const handleClickItem = (item: string) => {
    let saveStr = "";
    if (item === "C") {
      setResult("0");
      setSmallCalculation("");
      setSaveNumbers("");
    } else {
      if (parseInt(item)) {
        saveStr = saveNumbers.concat("", item);
        setResult(saveStr);
        setSaveNumbers(saveStr);
        setSmallCalculation(smallCalculation.concat("", item));
      } else {
        if (item !== "AC" && item !== "C") {
          saveStr = smallCalculation.concat(" ", item, " ");
          setSaveNumbers("");
          setSmallCalculation(saveStr);
        }
      }
    }

    if (item === "=") {
      // savedLocalstorage?.push(smallCalculation);
      // setSavedLocalstorage(savedLocalstorage);
      setResult(eval(smallCalculation));
      setSmallCalculation("");
    }
  };
  console.log(savedLocalstorage);

  return (
    <div className="calculator-container">
      <div className="result-container">
        <div className="three-dots ">
          <div className="dots red"></div>
          <div className="dots yellow"></div>
          <div className="dots green"></div>
        </div>
        <div className="result-area">
          <span className="small-text">{smallCalculation}</span> <span>{result}</span>
        </div>
      </div>
      <div className="parent">
        {TITLES.map((item, index) => (
          <div
            key={index}
            className={`div${index + 1}`}
            onClick={() => handleClickItem(result !== "0" && item === "AC" ? "C" : item)}
          >
            {result !== "0" && item === "AC" ? "C" : item}
          </div>
        ))}
      </div>
    </div>
  );
}
