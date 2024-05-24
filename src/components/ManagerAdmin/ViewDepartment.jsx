import React, { useState, useEffect } from "react";
import * as api from "../../api/ApiRequests";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button"; // Import Button from react-bootstrap
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function ViewDepartment() {
  const [managerName, setManagerName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [users, setUsers] = useState([]);
  const [departmentID, setDepartmentID] = useState(null); // Add state for departmentID

  useEffect(() => {
    let urlParams = window.location.pathname.split("/");
    let deptID = Number(urlParams[urlParams.length - 1]);
    setDepartmentID(deptID); // Set the departmentID

    // Fetch department details
    api.getDepartment(deptID, (departmentData) => {
      if (departmentData) {
        setDepartmentName(
          departmentData.departmentName || "Department Name Not Found"
        );
        setManagerName(departmentData.userName || "No Manager Assigned");
      } else {
        setDepartmentName("Department Not Found");
        setManagerName("No Manager Assigned");
      }

      // Fetch users in the department
      fetch(`http://localhost:8080/users?departmentId=${deptID}`)
        .then((response) => response.json())
        .then((data) => {
          // Extract the name from JSON
          const updatedUsers = data.map((user) => ({
            ...user,
            name: JSON.parse(user.data).name,
          }));
          setUsers(updatedUsers);
        })
        .catch((error) => {
          console.error("Failed to fetch users:", error);
        });
    });
  }, []);

  return (
    <div className="moveToRight-container">
      <div>
        <p>
          <strong>Department :</strong> {departmentName}
        </p>
        <p>
          <strong>Supervisor :</strong> {managerName}
        </p>
      </div>
      <div>
        <h3>Users in Department</h3>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role Description</th>
            </tr>
          </thead>
          <tbody>
            {users.map((row) => (
              <tr key={row.userID}>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.roleDescription}</td>
                <td>
                  <Link to={"/profile/" + row.userID}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div>
        {/* Add a button to navigate to ReviewRequests page */}
        {departmentID && (
          <Link to={`/reviewRequests/${departmentID}`}>
            <Button variant="primary">See Holiday Requests</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default ViewDepartment;