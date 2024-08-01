import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Card } from "react-bootstrap";
import "@/App.css";
import Layout from "../PageLayout/Layout";
import * as api from "../../api/ApiRequests";
import isEqual from "lodash.isequal";
import cloneDeep from "lodash/cloneDeep";
import { useNavigate } from "react-router-dom";
import "../../css/Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userJson, setUserJson] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState(null);
  const [updatedUserJson, setUpdatedUserJson] = useState(null);
  const [isLoggedInUser, setIsLoggedInUser] = useState(null);
  const [managerName, setManagerName] = useState("");
  const [roleName, setRoleName] = useState("");
  const [userName, setUserName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [departments, setDepartments] = useState([]); // for storing list of departments
  const [loggedInUserRole, setLoggedInUserRole] = useState(null);
  const roles = [
    { roleid: 1, roledescription: "Manager" },
    { roleid: 2, roledescription: "Supervisor" },
    { roleid: 3, roledescription: "Employee" },
  ];

  useEffect(() => {
    let urlParams = window.location.pathname.split("/");
    // Profile ID requested
    let profileUserId = Number(urlParams[urlParams.length - 1]);
    // Retrieve user data from localStorage
    const userString = localStorage.getItem("holiday-tracker-user");
    const userJson = JSON.parse(userString);

    setLoggedInUserRole(userJson.roleID); //get userRole of the logged user to define what is going to be displayed

    setIsLoggedInUser(userJson.userID === profileUserId);
    if (isLoggedInUser) {
      // Logged in user, cached data is used
      loadUser(userJson);
    } else {
      // DB call to load profile data
      api.getUser(profileUserId, (result) => {
        loadUser(result);
      });
    }

    api.getAllDepartments((data) => {
      setDepartments(data);
    });
  }, [isLoggedInUser]);
  function loadUser(userJson) {
    const userData = JSON.parse(userJson.data);
    userJson.data = JSON.stringify(userData);
    setUserData(userData); // The initial user data
    setUserJson(userJson);
    setUpdatedUserData(cloneDeep(userData)); // The updated user data (as the form fields are being modified)
    setUpdatedUserJson(cloneDeep(userJson)); // This is a clone, as we don't want to update the initial object
    api.getDepartment(userJson.departmentID, (result) => {
      setManagerName(result.userName);
      setDepartmentName(result.departmentName);
    });
    api.getRole(userJson.roleID, (result) => {
      setRoleName(result.roleDescription);
    });
    setUserName(userData ? userData.name : "");
  }
  function handleSave(event) {
    event.preventDefault();

    let ud = updatedUserData;
    ud.name = event.target.username.value;
    setUpdatedUserData(ud);

    let uj = updatedUserJson;
    uj.departmentID = departments.find(
      (e) => e.departmentName === event.target.department.value
    ).departmentID;
    uj.roleID = roles.find(
      (e) => e.roledescription === event.target.role.value
    ).roleid;
    uj.data = JSON.stringify(ud);
    setUpdatedUserJson(uj);

    if (
      isEqual(userData, updatedUserData) &&
      isEqual(userJson, updatedUserJson)
    ) {
      alert("No changes to save!");
    } else {
      alert("Saving...");
      api.putUser(userJson.userID, uj, (result, httpCode) => {
        if (httpCode === 200) {
          window.location.reload(); //Refresh the page when the user is saved
        }
        //alert(result);
      });
      if (isLoggedInUser) {
        // Save changes to logged in user in cache
        localStorage.setItem("holiday-tracker-user", JSON.stringify(uj));
        // Refresh page
        window.location.reload();
        alert("User updated successfully!");
      }
    }
  }
  function handleDelete() {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const profileUserId = userJson.userID;
      const previousUrl = sessionStorage.getItem("previousUrl"); // Get the previous URL
      api.deleteUser(profileUserId, (result) => {
        alert(result);
        // Redirect to the previous URL after deletion: https://stackoverflow.com/a/71647428
        if (
          (window.history?.length && window.history.length > 1) ||
          window.history.state?.idx
        ) {
          navigate(-1);
        } else {
          navigate("/", { replace: true });
        }
      });
    }
  }
  const isLoggedInUserRole3 = loggedInUserRole === 3; // Check if logged-in user is an employee

  return (
    <Layout>
      <div className="moveToRight-container">
        <div style={{ padding: "1rem" }}>
          <h2
            style={{
              marginBottom: "25px",
              textAlign: "center",
            }}
          >
            User Profile
          </h2>
          <div className="shadow p-3 mb-5 bg-white rounded">
            <Card>
              <Card.Body>
                <Form onSubmit={handleSave}>
                  {/*------------  Name Field ------------ */}
                  <Form.Group
                    as={Row}
                    className="mt-5 mb-3"
                    controlId="formHorizontalName"
                  >
                    <Form.Label column sm={3}>
                      Name
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        name="username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  {/*------------  Email Field ------------ */}
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formHorizontalEmail"
                  >
                    <Form.Label column sm={3}>
                      Email
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        type="email"
                        name="email"
                        value={userJson ? userJson.email : ""}
                        readOnly
                      />
                    </Col>
                  </Form.Group>
                  {/*------------  Supervisor Field------------  */}
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formHorizontalManager"
                  >
                    <Form.Label column sm={3}>
                      Supervisor
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        name="manager"
                        value={managerName}
                        readOnly
                      />
                    </Col>
                  </Form.Group>
                  {/* ------------ Role Field ------------ */}
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formHorizontalRole"
                  >
                    <Form.Label column sm={3}>
                      Role
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Select
                        value={roleName}
                        name="role"
                        disabled={isLoggedInUserRole3} // Disabled if logged-in user role is 3
                        onChange={(e) => setRoleName(e.target.value)}
                      >
                        {roles.map((role) => (
                          <option
                            key={role.roleid}
                            value={role.roledescription}
                          >
                            {role.roledescription}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Form.Group>
                  {/* ------------ Department Field------------  */}
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formHorizontalDepartment"
                  >
                    <Form.Label column sm={3}>
                      Department
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Select
                        value={departmentName}
                        name="department"
                        disabled={isLoggedInUserRole3} // Disabled if logged-in user role is 3
                        onChange={(e) => setDepartmentName(e.target.value)}
                      >
                        {departments.map((department) => (
                          <option
                            key={department.departmentID}
                            value={department.departmentName}
                          >
                            {department.departmentName}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Form.Group>
                  {/*------------ Save and Delete Buttons ------------ */}
                  <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 12 }}>
                      <div className="button-container">
                        <Button
                          type="submit"
                          className="btn btn-success btn-lg submit-button"
                        >
                          Save Changes
                        </Button>

                        {/* Delete Button (only visible if logged-in user role is not 3) */}
                        {!isLoggedInUserRole3 && (
                          <Button
                            onClick={handleDelete}
                            className="btn btn-danger btn-lg delete-button"
                          >
                            Delete User
                          </Button>
                        )}
                      </div>
                    </Col>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
