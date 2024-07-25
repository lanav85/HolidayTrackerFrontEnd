import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "@/App.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import * as api from "../../api/ApiRequests";
import { Card } from "react-bootstrap";

function ManageEmployees() {
  const [sortBy, setSortBy] = useState(null); // State to track the currently selected sort option
  const [sortDirection, setSortDirection] = useState("asc"); // State to track the sort direction
  const [users, setUsers] = useState([]);

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
  const sortedData = users.sort((a, b) => {
    if (!sortBy) return 0; // If no sort option is selected, maintain the original order
    if (sortDirection === "asc") {
      return a[sortBy].localeCompare(b[sortBy]);
    } else {
      return b[sortBy].localeCompare(a[sortBy]);
    }
  });

  return (
    <div className="moveToRight-container">
      <div style={{ marginTop: "50px", padding: "2vw" }}>
        <h2
          style={{
            marginBottom: "25px",
            textAlign: "center",
          }}
        >
          Employee
        </h2>
        <div className="shadow p-3 mb-5 bg-white rounded">
          <Table
            striped
            className="table-full-width"
            style={{
              width: "100%" /* Ensure the table takes up all available space */,
            }}
          >
            <thead>
              <tr>
                <th className="table-cell-center">#</th>
                <th
                  className="table-cell-center"
                  onClick={() => handleSort("name")}
                >
                  Name
                </th>
                <th className="table-cell-center">Email</th>
                <th className="table-cell-center"></th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row, index) => (
                <tr key={row.userID}>
                  <td className="table-cell-center">{index + 1}</td>
                  <td className="table-cell-center">{row.name}</td>
                  <td className="table-cell-center">{row.email}</td>
                  <td className="table-cell-center">
                    <Link to={"/profile/" + row.userID}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default ManageEmployees;
