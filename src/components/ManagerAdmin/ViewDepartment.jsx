import React, { useState, useEffect } from "react";
import * as api from "../../api/ApiRequests";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function ViewDepartment() {
  const [managerName, setManagerName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [users, setUsers] = useState([]);
  const [departmentID, setDepartmentID] = useState(null);

  useEffect(() => {
    let urlParams = window.location.pathname.split("/");
    let deptID = Number(urlParams[urlParams.length - 1]);
    setDepartmentID(deptID);

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
      api.getUsersByDepartmentId(deptID, (data) => {
        const updatedUsers = data.map((user) => ({
          ...user,
          name: user.name, // Since data is already parsed
        }));
        setUsers(updatedUsers);
      });
    });
  }, []);

  const handleDeleteDepartment = () => {
    // Check if there are users in the department
    if (users.length > 0) {
      alert("You can't delete the department. There are users assigned to it.");
    } else {
      // If no users, proceed with deleting the department
      api.deleteDepartment(departmentID, (result) => {
        // Handle successful deletion
        alert("Department deleted successfully.");
        // Optionally, you can redirect to another page or refresh the current page
      });
    }
  };

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
        {departmentID && (
          <>
            <Button variant="danger" onClick={handleDeleteDepartment}>
              Delete Department
            </Button>{" "}
            {/* Add a button to delete the department */}
            <Link to={`/reviewRequests/${departmentID}`}>
              <Button variant="primary">See Holiday Requests</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default ViewDepartment;
