import React, { useState, useEffect } from "react";
import XLSX from "xlsx/dist/xlsx.full.min"; // Import specific functions or objects from XLSX library
import "@/App.css";

function ViewHolidayRequests() {
  const [holidayRequests, setHolidayRequests] = useState([]);

  useEffect(() => {
    async function fetchHolidayRequests() {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_APP_API_BASE_URL
          }/holidayRequests?status=Approved`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch approved holiday requests");
        }
        const data = await response.json();
        setHolidayRequests(data);
      } catch (error) {
        console.error("Error fetching holiday requests:", error);
      }
    }

    fetchHolidayRequests();
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
      <h1>Approved Holiday Requests</h1>
      <button onClick={downloadExcelFile}>Download Report</button>
    </div>
  );
}

export default ViewHolidayRequests;
