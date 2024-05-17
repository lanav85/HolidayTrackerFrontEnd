import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard.jsx";
import Profile from "./components/Profile.jsx";
import SubmitRequest from "./components/SubmitRequest.jsx";
import ReviewRequest from "./components/ReviewRequests.jsx";
import Login from "./components/Login.jsx";
import Layout from "./components/Layout.jsx";
import ManageEmployees from "./components/ManageEmployees.jsx";
import ManageDepartments from "./components/ManageDepartments.jsx";
import ViewDepartment from "./components/ViewDepartment.jsx";

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
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/profile/:user_id"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
          <Route
            path="/submit-request/*"
            element={
              <Layout>
                <SubmitRequest />
              </Layout>
            }
          />
          <Route
            path="/review-requests/*"
            element={
              <Layout>
                <ReviewRequest />
              </Layout>
            }
          />
          <Route
            path="/manage-employees/*"
            element={
              <Layout>
                <ManageEmployees />
              </Layout>
            }
          />
          <Route
            path="/manage-departments/*"
            element={
              <Layout>
                <ManageDepartments />
              </Layout>
            }
          />
          <Route
            path="/view-department/:departmentID" // added route for department ID
            element={
              <Layout>
                <ViewDepartment />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
