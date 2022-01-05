import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Calculator from "./src/pages/Calculator";
import "./src/styles/fonts.scss";
import "./src/styles/styles.scss";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Calculator />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
