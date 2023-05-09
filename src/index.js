import React from "react"; //💚
import ReactDOM from "react-dom"; //💚
import "./index.css"; //💚
import App from "./App"; //💚
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from "./reportWebVitals"; //💚
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPanel from "./Components/BackOffice/AdminPanel";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
