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
    <div className="moveToRight-container" style={{ marginTop: "7.125rem" }}>
      <div
        className="shadow p-3 mb-5 bg-white rounded"
        style={{ padding: "1.25rem" }}
      >
        <h2
          style={{
            marginBottom: "2.8125rem",
            marginTop: "1.5625rem",
            textAlign: "center",
          }}
        >
          Approved Holiday Requests
        </h2>
        <div style={{ textAlign: "center" }}>
          {" "}
          {/* Center the button */}
          <Button
            variant="success"
            size="lg"
            className="submit-button"
            onClick={downloadExcelFile}
            style={{ marginTop: "1.875rem" }} // Add top margin to button
          >
            Download Report
          </Button>
        </div>
      </div>
    </div>
  );
}
export default ViewHolidayRequests;
