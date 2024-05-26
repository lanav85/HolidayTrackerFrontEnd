import React, { useState } from "react";
import * as api from "../../api/ApiRequests";
import "@/App.css";
import { useNavigate } from "react-router-dom";

const CreateDepartment = () => {
  const navigate = useNavigate();
  const [departmentName, setDepartmentName] = useState("");

  const handleCreateDepartment = () => {
    if (departmentName.trim() === "") {
      alert("Please enter a department name.");
      return;
    }

    const newDepartment = {
      departmentName: departmentName,
      userID: 24,
    };

    // Call the API to create the department
    api.createDepartment(newDepartment, () => {
      // Trigger success alert directly in the frontend
      alert("Department created successfully!");
      setDepartmentName(""); // Clear the department name after successful creation
    });
  };

  return (
    <div className="moveToRight-container">
      <h1>Create New Department</h1>
      <div>
        <label>Department Name:</label>
        <input
          type="text"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          required
        />
      </div>
      <button
        onClick={handleCreateDepartment}
        className="btn btn-danger btn-lg delete-button"
      >
        Create Department
      </button>
    </div>
  );
};

export default CreateDepartment;
