import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
          <Route
            path="/dashboard/*"
            element={
              <Layout>
                {" "}
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/profile/*"
            element={
              <Layout>
                {" "}
                <Profile />{" "}
              </Layout>
            }
          />
          <Route
            path="/submit-request/*"
            element={
              <Layout>
                {" "}
                <SubmitRequest />{" "}
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
