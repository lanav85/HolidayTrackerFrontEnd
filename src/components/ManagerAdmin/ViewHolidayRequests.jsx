import React, { useState, useEffect } from "react";
import XLSX from "xlsx/dist/xlsx.full.min"; // Import specific functions or objects from XLSX library
import "@/App.css";
import Button from "react-bootstrap/Button";

import * as api from "../../api/ApiRequests";
import { Card } from "react-bootstrap";

function ViewHolidayRequests() {
  const [holidayRequests, setHolidayRequests] = useState([]);

  useEffect(() => {
    api.getApprovedHolidayRequests((data) => {
      setHolidayRequests(data);
    });
  }, []);

  // Function to handle Excel file download
  const downloadExcelFile = () => {
    // Customize the data format before converting to Excel
    const formattedData = holidayRequests.map((request) => ({
      Name: request.userName,
      Role: request.roleName,
      Department: request.departmentName,
      RequestFrom: request.requestFrom,
      RequestTo: request.requestTo,
      Status: request.status,
    }));

    // Convert the formatted data to Excel
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "HolidayRequests");

    // Save the Excel file
    XLSX.writeFile(workbook, "HolidayRequestsReport.xlsx");
  };

  return (
    <div className="moveToRight-container">
      <div style={{ padding: "200px" }}>
        <div className="shadow p-3 mb-5 bg-white rounded">
          <Card>
            <Card.Body>
              <h2
                style={{
                  marginBottom: "45px",
                  marginTop: "25px",
                }}
              >
                Approved Holiday Requests
              </h2>
              <button
                className="btn btn-success btn-lg submit-button"
                onClick={downloadExcelFile}
              >
                Download Report
              </button>
            </Card.Body>{" "}
          </Card>{" "}
        </div>
      </div>{" "}
    </div>
  );
}

export default ViewHolidayRequests;
