import React, { useEffect, useState } from "react";
import "./styles.scss";

export default function History() {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("history")));
  }, []);
  return (
    <div className="history-container">
      <h1>History</h1>
      <ul className="list-container">{history && history.length && history.map((item) => <li>{item}</li>)}</ul>
    </div>
  );
}
