import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "@/App.css";
import Layout from "./Layout";

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

      getManager(userJson.departmentID);
      getDepartmentName(userJson.departmentID);
      getRole(userJson.roleID);
    }

    // Fetch all departments
    getAllDepartments();
  }, []);

  async function getManager(departmentID) {
    try {
      const response = await fetch(
        `http://localhost:8080/Department?departmentID=${departmentID}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch department");
      }
      const data = await response.json();
      setManagerName(data[0].userName);
    } catch (error) {
      console.error("Failed to fetch department:", error);
    }
  }

  async function getDepartmentName(departmentID) {
    try {
      const response = await fetch(
        `http://localhost:8080/Department?departmentID=${departmentID}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch department");
      }
      const data = await response.json();
      setDepartmentName(data[0].departmentName);
    } catch (error) {
      console.error("Failed to fetch department:", error);
    }
  }

  async function getRole(roleId) {
    try {
      const response = await fetch(
        `http://localhost:8080/Role?roleId=${roleId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch role");
      }
      const data = await response.json();
      setRoleName(data[0].roleDescription);
    } catch (error) {
      console.error("Failed to fetch role:", error);
    }
  }

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
                <Form.Control type="text" value={managerName} />
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
                  onChange={(e) => setRoleName(e.target.value)}
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
