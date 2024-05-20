import React, { useState, useEffect } from "react";
import * as api from "../../api/ApiRequests";
import "@/App.css";

function ViewDepartment() {
  const [managerName, setManagerName] = useState("");
  const [departmentName, setDepartmentName] = useState("");

  useEffect(() => {
    // Extract departmentID from URL path
    let urlParams = window.location.pathname.split("/");
    let departmentID = Number(urlParams[urlParams.length - 1]);

    api.getDepartment(departmentID, (departmentData) => {
      loadDepartment(departmentData);
    });
  }, []);

  function loadDepartment(departmentData) {
    setDepartmentName(departmentData.departmentName);
    setManagerName(departmentData.userName);
  }

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
        {/* Add logic to display users in the department */}
      </div>
    </div>
  );
}

export default ViewDepartment;
