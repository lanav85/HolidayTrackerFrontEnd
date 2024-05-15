import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function ReviewRequests() {
  const [departmentID, setDepartmentID] = useState(null);
  const [holidayRequests, setHolidayRequests] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("Pending");
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear());
  const [filteredHolidayRequests, setFilteredHolidayRequests] = useState([]);

  useEffect(() => {
    const userDataString = localStorage.getItem("holiday-tracker-user");
    const userData = JSON.parse(userDataString);
    if (userData) {
      setDepartmentID(userData.departmentID);
      getHolidayRequests(userData.departmentID);
    }
  }, []);

  useEffect(() => {
    filterRequests();
  }, [nameFilter, statusFilter, yearFilter, holidayRequests]);

  async function getHolidayRequests(departmentID) {
    try {
      const response = await fetch(
        `http://localhost:8080/holidayRequests?departmentId=${departmentID}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch holiday requests");
      }
      const data = await response.json();
      setHolidayRequests(data);
    } catch (error) {
      console.error("Failed to fetch holiday requests:", error);
    }
  }

  function filterRequests() {
    let filteredRequests = holidayRequests.filter((request) => {
      if (
        nameFilter &&
        !request.userName.toLowerCase().includes(nameFilter.toLowerCase())
      ) {
        return false;
      }
      if (statusFilter !== "All" && request.status !== statusFilter) {
        return false;
      }
      const requestYear = new Date(request.requestFrom).getFullYear();
      if (yearFilter && requestYear !== yearFilter) {
        return false;
      }
      return true;
    });
    setFilteredHolidayRequests(filteredRequests);
  }
  // Update the status of a holiday request locally
  function handleStatusChange(requestID, newStatus) {
    const updatedRequests = filteredHolidayRequests.map((request) => {
      if (request.requestID === requestID) {
        return { ...request, status: newStatus };
      }
      return request;
    });
    setFilteredHolidayRequests(updatedRequests);
  }
  async function handleSubmit(requestID, newStatus) {
    try {
      const specificRequest = holidayRequests.find(
        (request) => request.requestID === requestID
      );

      if (!specificRequest) {
        throw new Error(`Holiday request with ID ${requestID} not found.`);
      }

      const response = await fetch(
        `http://localhost:8080/HolidayRequest/${requestID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...specificRequest, status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      console.log(`Request with ID ${requestID} submitted`);
      getHolidayRequests(departmentID);
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  }

  return (
    <div
      style={{
        fontSize: "18px",
        marginTop: "150px",
        marginLeft: "280px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Holiday Requests</h2>
      <div>
        <label htmlFor="nameFilter">Filter by Name:</label>
        <input
          type="text"
          id="nameFilter"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="statusFilter">Filter by Status:</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="All">All</option>
        </select>
      </div>

      <div>
        <label htmlFor="yearFilter">Filter by Year:</label>
        <select
          id="yearFilter"
          value={yearFilter}
          onChange={(e) => setYearFilter(parseInt(e.target.value))}
        >
          {[
            ...new Set(
              holidayRequests.map((request) =>
                new Date(request.requestFrom).getFullYear()
              )
            ),
          ].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {filteredHolidayRequests.length === 0 && (
        <p>There are no Holiday Requests to review</p>
      )}
      {filteredHolidayRequests.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Request From</th>
              <th>Request To</th>
              <th>Status</th>
              <th>Submit</th>
            </tr>
          </thead>
          <tbody>
            {filteredHolidayRequests.map((request) => (
              <tr key={request.requestID}>
                <td>{request.userName}</td>
                <td>{request.requestFrom}</td>
                <td>{request.requestTo}</td>
                <td>
                  {request.status === "Rejected" ? (
                    "Rejected"
                  ) : (
                    <select
                      value={request.status}
                      onChange={(e) =>
                        handleStatusChange(request.requestID, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  )}
                </td>
                <td>
                  {request.status !== "Rejected" && (
                    <Button
                      variant="primary"
                      onClick={() =>
                        handleSubmit(request.requestID, request.status)
                      }
                    >
                      Submit
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default ReviewRequests;
