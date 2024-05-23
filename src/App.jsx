import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./components/Supervisor/Dashboard.jsx";
import Profile from "./components/Supervisor/Profile.jsx";
import SubmitRequest from "./components/SubmitRequest.jsx";
import ReviewRequest from "./components/Supervisor/ReviewRequests.jsx";
import Login from "./components/Login.jsx";
import Layout from "./components/PageLayout/Layout.jsx";
import ManageEmployees from "./components/Supervisor/ManageEmployees.jsx";
import ManageDepartments from "./components/ManagerAdmin/ManageDepartments.jsx";
import ViewDepartment from "./components/ManagerAdmin/ViewDepartment.jsx";
import CreateDepartment from "./components/ManagerAdmin/CreateDepartment"; // Import the CreateDepartment component
import CreateUser from "./components/ManagerAdmin/CreateUser.jsx";

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
            path="/reviewRequests/:departmentID"
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
            path="/view-department/:departmentID"
            element={
              <Layout>
                <ViewDepartment />
              </Layout>
            }
          />
          <Route
            path="/create-department"
            element={
              <Layout>
                <CreateDepartment />
              </Layout>
            }
          />
          <Route
            path="/create-user"
            element={
              <Layout>
                <CreateUser />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
