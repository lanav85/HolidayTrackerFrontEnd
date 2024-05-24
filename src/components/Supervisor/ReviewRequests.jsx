import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import * as api from "../../api/ApiRequests";

function ReviewRequests() {
  const [departmentID, setDepartmentID] = useState(null);
  const [holidayRequests, setHolidayRequests] = useState([]);
  const [filteredHolidayRequests, setFilteredHolidayRequests] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("Pending");
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchUserData = async () => {
      const userDataString = localStorage.getItem("holiday-tracker-user");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        if (userData && userData.departmentID) {
          setDepartmentID(userData.departmentID);
          await getHolidayRequests(userData.departmentID);
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [nameFilter, statusFilter, yearFilter, holidayRequests]);

  const getHolidayRequests = async (departmentID) => {
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
  };

  const filterRequests = () => {
    const filteredRequests = holidayRequests.filter((request) => {
      const requestYear = new Date(request.requestFrom).getFullYear();
      return (
        (!nameFilter ||
          request.userName.toLowerCase().includes(nameFilter.toLowerCase())) &&
        (statusFilter === "All" || request.status === statusFilter) &&
        requestYear === yearFilter
      );
    });
    setFilteredHolidayRequests(filteredRequests);
  };

  const handleStatusChange = (requestID, newStatus) => {
    setFilteredHolidayRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.requestID === requestID
          ? { ...request, status: newStatus }
          : request
      )
    );
  };

  const handleSubmit = async (requestID, newStatus) => {
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
      await getHolidayRequests(departmentID);
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  const getStatusOptions = (currentStatus, requestID) => {
    if (currentStatus === "Rejected") {
      return "Rejected";
    } else if (currentStatus === "Approved") {
      return (
        <select
          value={currentStatus}
          onChange={(e) => handleStatusChange(requestID, e.target.value)}
        >
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      );
    } else {
      return (
        <select
          value={currentStatus}
          onChange={(e) => handleStatusChange(requestID, e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      );
    }
  };

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
                <td>{getStatusOptions(request.status, request.requestID)}</td>
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
