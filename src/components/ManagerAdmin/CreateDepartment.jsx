import React, { useState } from "react";
import * as api from "../../api/ApiRequests";
import "@/App.css";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

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
      <div style={{ marginTop: "50px", padding: "2vw" }}>
        <h2
          style={{
            marginBottom: "25px",
            textAlign: "center",
          }}
        >
          Create New Department
        </h2>
        <div className="shadow p-3 mb-5 bg-white rounded">
          <div>
            <label style={{ padding: "20px" }}>
              <h4>Department Name: </h4>
            </label>
            <input
              type="text"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              required
            />
          </div>
          <Button
            style={{ fontSize: "17px" }}
            onClick={handleCreateDepartment}
            type="submit"
            className="btn btn-success btn-lg submit-button"
          >
            Create Department
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateDepartment;
