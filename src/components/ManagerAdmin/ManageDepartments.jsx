import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "@/App.css";
import * as api from "../../api/ApiRequests";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function ManageDepartments() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    api.getAllDepartments((data) => {
      setDepartments(data);
    });
  }, []);

  return (
    <div className="moveToRight-container">
      <div style={{ marginTop: "50px", padding: "2vw" }}>
        <h2
          style={{
            marginBottom: "25px",
            textAlign: "center",
          }}
        >
          Manage Departments
        </h2>
        <div className="shadow p-3 mb-5 bg-white rounded">
          <Table striped>
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
                    <Link to={`/view-department/${dept.departmentID}`}>
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Link to="/create-department">
            <Button
              style={{ marginTop: "30px" }}
              type="submit"
              className="btn btn-success btn-lg submit-button"
            >
              Create New Department{" "}
            </Button>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ManageDepartments;
