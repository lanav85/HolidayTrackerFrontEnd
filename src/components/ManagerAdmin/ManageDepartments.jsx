import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "@/App.css";

function ManageDepartments() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    async function getAllDepartments() {
      try {
        const response = await fetch(`/api/Department`);
        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }
        const data = await response.json();
        setDepartments(data); // Store the fetched departments
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    }

    getAllDepartments();
  }, []);

  return (
    <div className="moveToRight-container">
      <h2>Manage Departments</h2>
      <div>
        <Link to="/create-department">
          <button>Create New Department</button>
        </Link>
        <h3>All Departments</h3>
        <table>
          <thead>
            <tr>
              <th>Department Name</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept, index) => (
              <tr key={index}>
                <td>{dept.departmentName}</td>
                <td>
                  <Link to={`/view-department/${dept.departmentID}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageDepartments;
