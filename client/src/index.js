import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// Importing the Bootstrap CSS  , 
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/animate.min.css";

import App from './layouts/App';
import Admin from './layouts/Admin';
import reportWebVitals from './components/reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
  <Switch>
    <Redirect exact from="/admin" to="/admin/dashboard" /> 
    <Route path="/admin" render={(props) => <Admin {...props} />} /> 
    <Route path="/" render={(props) => <App {...props} />} />
  </Switch>
</BrowserRouter>,
document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
