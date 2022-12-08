// REACT AND REACT DOM
import React from "react";
import ReactDOM from "react-dom/client";

// REACT ROUTER COMPONENTS
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ROUTES
import App from "./App";
import AddSector from "./features/sectors/add-sector";
import EditSector from "./features/sectors/edit-sector";

// STYLES
import "./index.css";

// REPORTS
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add-sector" element={<AddSector />} />
        <Route path="/edit-sector/:id" element={<EditSector />} />
        <Route path="/sector-listing" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
