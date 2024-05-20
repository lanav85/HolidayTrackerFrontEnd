import React, { useState, useEffect } from "react";
import * as api from "../../api/ApiRequests";
import "@/App.css";

function ViewDepartment() {
  const [managerName, setManagerName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let urlParams = window.location.pathname.split("/");
    let departmentID = Number(urlParams[urlParams.length - 1]);

    api.getDepartment(departmentID, (departmentData) => {
      setDepartmentName(departmentData.departmentName);
      setManagerName(departmentData.userName);

      // Fetch users in the same department
      api.getUsersInDepartment(departmentID, (usersData) => {
        setUsers(usersData);
      });
    });
  }, []);

  return (
    <div className="moveToRight-container">
      <h2>View Department</h2>
      <div>
        <h3>Department Details</h3>
        <p>
          <strong>Department Name:</strong> {departmentName}
        </p>
        <p>
          <strong>Manager Name:</strong> {managerName}
        </p>
      </div>
      <div>
        <h3>Users in Department</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userID}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewDepartment;
