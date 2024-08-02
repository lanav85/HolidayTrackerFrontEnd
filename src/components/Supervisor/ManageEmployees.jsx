import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "@/App.css";
import { Link } from "react-router-dom";
import * as api from "../../api/ApiRequests";
import "../../css/ManageEmployee.css";

function ManageEmployees() {
  const [sortBy, setSortBy] = useState(null); // State to track the currently selected sort option
  const [sortDirection, setSortDirection] = useState("asc"); // State to track the sort direction
  const [users, setUsers] = useState([]);
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    const userString = localStorage.getItem("holiday-tracker-user");
    const userJson = JSON.parse(userString);
    if (users.length === 0) {
      api.getUsersByDepartmentId(userJson.departmentID, setUsers, (error) => {
        console.error(
          "Failed to fetch users for departmentId " + userJson.departmentID,
          error
        );
      });
    }
  }, [users]);

  // Function to handle sorting
  const handleSort = (sortByValue) => {
    // If the same column is clicked again, reverse the sort direction
    if (sortBy === sortByValue) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // If a different column is clicked, set the new sort option and reset sort direction to 'asc'
      setSortBy(sortByValue);
      setSortDirection("asc");
    }
  };

  // Function to sort the data based on the currently selected sort option and direction
  const sortedData = users
    .filter((user) =>
      user.name.toLowerCase().includes(nameFilter.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortBy) return 0; // If no sort option is selected, maintain the original order
      if (sortDirection === "asc") {
        return a[sortBy].localeCompare(b[sortBy]);
      } else {
        return b[sortBy].localeCompare(a[sortBy]);
      }
    });

  const renderEmployeeRow = (request) => {
    return (
      <tr key={request.userID}>
        <td>{request.name}</td>
        <td>{request.email}</td>
        <td>
          <Link to={"/profile/" + request.userID}>View</Link>
        </td>
      </tr>
    );
  };

  return (
    <div className="moveToRight-container">
      <div style={{ marginTop: "3.125rem" }}>
        <h2>Manage Employees</h2>
        <div className="shadow p-3 mb-5 bg-white rounded">
          <div className="label-container">
            <label style={{ padding: "0.8125rem" }} htmlFor="nameFilter">
              Filter by Name:{" "}
            </label>
            <input
              type="text"
              id="nameFilter"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </div>

          {sortedData.length === 0 && <p>There are no employees to display</p>}
          {sortedData.length > 0 && (
            <Table className="table" striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((request) => renderEmployeeRow(request))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageEmployees;
