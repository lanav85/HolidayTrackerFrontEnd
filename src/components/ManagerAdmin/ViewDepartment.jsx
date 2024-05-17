// ViewDepartment.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "@/App.css";

function ViewDepartment() {
  return (
    <div className="moveToRight-container">
      <h2>View Department</h2>
      <div>
        <h3>Department Details</h3>
        <p>
          <strong>Department Name:</strong>
        </p>
        <p>
          <strong>Department Manager:</strong>
        </p>
      </div>
      <div>
        <h3>Users in Department</h3>
      </div>
    </div>
  );
}

export default ViewDepartment;
