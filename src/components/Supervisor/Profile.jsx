import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
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

  return (
    <Layout>
      <div className="moveToRight-container">
        <div style={{ marginTop: "50px", padding: "2vw" }}>
          <Form onSubmit={handleSave}>
            <Form.Group
              as={Row}
              className="mb-3"
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
                  disabled={userJson && userJson.roleID >= 3}
                  onChange={(e) => setRoleName(e.target.value)}
                >
                  {roles.map((role) => (
                    <option key={role.roleid} value={role.roledescription}>
                      {role.roledescription}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>
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
                  disabled={userJson && userJson.roleID >= 3}
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
            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 12 }}>
                <div className="button-container">
                  <Button
                    type="submit"
                    className="btn btn-success btn-lg submit-button"
                  >
                    Save Changes
                  </Button>
                  <Button
                    onClick={handleDelete}
                    className="btn btn-danger btn-lg delete-button"
                  >
                    Delete User
                  </Button>
                </div>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </div>
    </Layout>
  );
}
export default Profile;
