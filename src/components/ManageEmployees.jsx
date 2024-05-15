import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "@/App.css";
import Button from "react-bootstrap/Button";

function ManageEmployees() {
  const [sortBy, setSortBy] = useState(null); // State to track the currently selected sort option
  const [sortDirection, setSortDirection] = useState("asc"); // State to track the sort direction
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userString = localStorage.getItem("holiday-tracker-user");
    const userJson = JSON.parse(userString);
    if (users.length === 0) {
      getUsersByDepartmentId(userJson.departmentID);
    }
  });

  async function getUsersByDepartmentId(departmentID) {
    try {
      const response = await fetch(
        `http://localhost:8080/users?departmentId=${departmentID}`
      );
      if (!response.ok) {
        throw new Error(
          "Failed to fetch users for departmentId " + departmentID
        );
      }
      const data = await response.json();
      const formattedData = data.map((item) => {
        const userData = JSON.parse(item.data);
        return {
          name: userData.name,
          userID: item.userID,
          email: item.email,
        };
      });
      setUsers(formattedData);
    } catch (error) {
      console.error(
        "Failed to fetch users for departmentId " + departmentID,
        error
      );
    }
  }

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

  function handleView(userID) {
    alert("Request to view userID : " + userID);
  }

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
          <tr key={row.id}>
            <td>{index + 1}</td>
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>
              <Button variant="primary" onClick={() => handleView(row.userID)}>
                View
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ManageEmployees;
