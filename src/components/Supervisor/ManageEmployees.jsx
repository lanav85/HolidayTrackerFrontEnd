import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "@/App.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import * as api from "../../api/ApiRequests";

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
    <Table
      striped
      className="moveToRight-container"
      style={{
        width: "calc(60%)",
      }}
    >
      <thead>
        <tr>
          <th>#</th>
          <th onClick={() => handleSort("name")}>Name</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>
              <Link to={"/profile/" + row.userID}>View</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ManageEmployees;
