import React, { useEffect, useState } from "react";
import "./styles.scss";

const TITLES = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
  "=",
  "+",
  "-",
  "*",
  "/",
  "%",
  "+/-",
  "AC",
  "Enter",
];

export default function Calculator() {
  const [result, setResult] = useState("0");
  const [saveNumbers, setSaveNumbers] = useState("");
  const [savedLocalstorage, setSavedLocalstorage] = useState<string[]>([]);
  const [smallCalculation, setSmallCalculation] = useState("");
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const handleClickOutside = (evt) => {
      if (document.getElementById("result") == evt.target) {
        setShowInput(true);
      } else {
        setShowInput(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickItem = (item: string) => {
    let saveStr = "";
    if (item === "C") {
      setResult("0");
      setSmallCalculation("");
      setSaveNumbers("");
    } else {
      if (!isNaN(parseInt(item))) {
        saveStr = saveNumbers.concat("", item);
        setResult(saveStr);
        setSaveNumbers(saveStr);
        setSmallCalculation(smallCalculation.concat("", item));
      } else {
        if (item !== "AC" && item !== "C") {
          if (
            isNaN(
              parseInt(smallCalculation.replaceAll(" ", "").substring(smallCalculation.replaceAll(" ", "").length - 1))
            )
          ) {
            const tmp = smallCalculation;
            saveStr = tmp.replace(
              smallCalculation.replaceAll(" ", "").substring(smallCalculation.replaceAll(" ", "").length - 1),
              item
            );
          } else {
            saveStr = smallCalculation.concat(" ", item, " ");
          }
          setSaveNumbers("");
          setSmallCalculation(saveStr);
        }
      }
    }

    if (item === "%") {
      setResult(eval(`${result}/100`));
      setSmallCalculation("");
    }
    if (item === "=" || item === "enter") {
      let tmpArr = savedLocalstorage;
      tmpArr?.push(`${smallCalculation} = ${eval(smallCalculation)}`);

      localStorage.setItem("history", JSON.stringify(tmpArr));
      setResult(eval(smallCalculation));
      setSmallCalculation("");
    }
  };

  const handleClickValue = () => {
    setShowInput(true);
  };

  const handleChangeValue = (evt) => {
    setSmallCalculation(smallCalculation.replace(result, evt.target.value));
    setResult(evt.target.value);
    // handleClickItem(value.target.value);
  };

  return (
    <div className="calculator-container">
      <div className="result-container">
        <div className="three-dots ">
          <div className="dots red"></div>
          <div className="dots yellow"></div>
          <div className="dots green"></div>
        </div>
        <div className="result-area">
          <span className="small-text">{smallCalculation}</span>{" "}
          {showInput ? (
            <input id="result" type={"number"} defaultValue={result} onChange={handleChangeValue} />
          ) : (
            <span onClick={handleClickValue}>{result}</span>
          )}
        </div>
      </div>
      <div className="parent">
        {TITLES.map((item, index) => {
          if (item !== "Enter") {
            return (
              <div
                key={index}
                className={`div${index + 1}`}
                onClick={() => handleClickItem(result !== "0" && item === "AC" ? "C" : item)}
              >
                {result !== "0" && item === "AC" ? "C" : item}
              </div>
            );
          }
          return;
        })}
      </div>
    </div>
  );
}
