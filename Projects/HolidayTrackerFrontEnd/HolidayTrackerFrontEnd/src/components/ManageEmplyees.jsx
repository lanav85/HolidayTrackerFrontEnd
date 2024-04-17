import React, { useState } from "react";
import Table from "react-bootstrap/Table";

function ManageEmplyees() {
  const [sortBy, setSortBy] = useState(null); // State to track the currently selected sort option
  const [sortDirection, setSortDirection] = useState("asc"); // State to track the sort direction

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

  // Data for the table
  const tableData = [
    { id: 1, name: "Mark", department: "Sales", email: "@mdo" },
    { id: 2, name: "Jacob", department: "IT", email: "@fat" },
    { id: 3, name: "Larry the Bird", department: "HR", email: "@twitter" },
  ];

  // Function to sort the data based on the currently selected sort option and direction
  const sortedData = tableData.sort((a, b) => {
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
      style={{
        marginLeft: "calc(35% + 60px)",
        marginRight: "30%",
        marginTop: "70px",
        padding: "3vw",
      }}
    >
      <thead>
        <tr>
          <th>#</th>
          <th onClick={() => handleSort("name")}>Name</th>
          <th onClick={() => handleSort("department")}>Department</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, index) => (
          <tr key={row.id}>
            <td>{index + 1}</td>
            <td>{row.name}</td>
            <td>{row.department}</td>
            <td>{row.email}</td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ManageEmplyees;
