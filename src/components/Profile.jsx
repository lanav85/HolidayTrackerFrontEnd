import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "@/App.css";
import Layout from "./Layout";
import * as api from "../api/ApiRequests";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [userJson, setUserJson] = useState(null);
  const [managerName, setManagerName] = useState("");
  const [roleName, setRoleName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [departments, setDepartments] = useState([]); //  for storing list of departments

  useEffect(() => {
    // Retrieve user data from localStorage
    const userString = localStorage.getItem("holiday-tracker-user");
    const userJson = JSON.parse(userString);

    if (userJson) {
      const userData = JSON.parse(userJson.data);
      setUserData(userData);
      setUserJson(userJson);

      api.getDepartment(userJson.departmentID, (result) => {
        setManagerName(result.userName);
        setDepartmentName(result.departmentName);
      });
      api.getRole(userJson.roleID, (result) => {
        setRoleName(result.roleDescription);
      });
    }

    // Fetch all departments
    getAllDepartments();
  }, []);

  // Get List of all departments in the database
  async function getAllDepartments() {
    try {
      const response = await fetch(`http://localhost:8080/Department`);
      if (!response.ok) {
        throw new Error("Failed to fetch departments");
      }
      const data = await response.json();
      setDepartments(data); // Store the fetched departments
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  }

  return (
    <Layout>
      <div className="moveToRight-container">
        <div style={{ marginTop: "50px", padding: "2vw" }}>
          <Form>
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
                  value={userData ? userData.name : ""}
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
                Manager
              </Form.Label>
              <Col sm={8}>
                <Form.Control type="text" value={managerName} readOnly />
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
                  onChange={(e) => setRoleName(e.target.value)} //dropdown menu
                >
                  <option value="Manager">Manager</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Employee">Employee</option>
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
                  onChange={(e) => setDepartmentName(e.target.value)} // dropdpwn menu: Update the state when a new department is selected
                >
                  {departments.map((department) => (
                    // Map over the list of departments and create an option for each one
                    <option
                      key={department.departmentID} // Unique key for each department option
                      value={department.departmentName} // Set the value of the option to the department name
                    >
                      {department.departmentName}
                    </option> // Display the department name as the option text
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 3 }}>
                <Button
                  type="button"
                  className="btn btn-success btn-lg submit-button"
                >
                  Save Changes
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
