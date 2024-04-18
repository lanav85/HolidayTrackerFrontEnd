import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Profile from "./components/Profile.jsx";
import SubmitRequest from "./components/SubmitRequest.jsx";
import Login from "./components/Login.jsx";
import Layout from "./components/Layout.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
        <Layout />

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/submit-request" element={<SubmitRequest />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
