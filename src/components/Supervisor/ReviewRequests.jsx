import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import * as api from "../../api/ApiRequests";
import "../../css/ReviewRequests.css";
import { Card } from "react-bootstrap";

function ReviewRequests() {
  const [departmentID, setDepartmentID] = useState(null);
  const [holidayRequests, setHolidayRequests] = useState([]);
  const [filteredHolidayRequests, setFilteredHolidayRequests] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("Pending");
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear());
  const [mapRequestIdOriginalStatus, setMapRequestIdOriginalStatus] = useState(
    {}
  );

  useEffect(() => {
    let urlParams = window.location.pathname.split("/");
    let deptID = Number(urlParams[urlParams.length - 1]);
    setDepartmentID(deptID);
    api.getHolidayRequestsByDepartmentId(deptID, (data) => {
      setHolidayRequests(data);
      data.forEach((req) => {
        mapRequestIdOriginalStatus[req.requestID] = req.status;
        setMapRequestIdOriginalStatus(mapRequestIdOriginalStatus);
      });
    });
  }, []);

  useEffect(() => {
    filterRequests();
  }, [nameFilter, statusFilter, yearFilter, holidayRequests]);

  const filterRequests = () => {
    const filteredRequests = holidayRequests.filter((request) => {
      const requestYear = new Date(request.requestFrom).getFullYear();
      return (
        (!nameFilter ||
          request.userName.toLowerCase().includes(nameFilter.toLowerCase())) &&
        (statusFilter === "All" ||
          request.status.toLowerCase() === statusFilter.toLowerCase()) &&
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

      api.updateHolidayRequest(
        requestID,
        { ...specificRequest, status: newStatus },
        () => {
          console.log(`Request with ID ${requestID} submitted`);
          api.getHolidayRequestsByDepartmentId(departmentID, (data) => {
            setHolidayRequests(data);
            data.forEach((req) => {
              mapRequestIdOriginalStatus[req.requestID] = req.status;
              setMapRequestIdOriginalStatus(mapRequestIdOriginalStatus);
            });
          });
        },
        () => {
          throw new Error("Failed to submit request");
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  const getStatusOptions = (currentStatus, requestID) => {
    let originalStatus = mapRequestIdOriginalStatus[requestID];
    if (originalStatus === "Rejected") {
      return "Rejected";
    } else if (originalStatus === "Approved") {
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

  const renderHolidayRequestRow = (request) => {
    return (
      <tr key={request.requestID}>
        <td>{request.userName}</td>
        <td>{request.requestFrom}</td>
        <td>{request.requestTo}</td>
        <td>{getStatusOptions(request.status, request.requestID)}</td>
        <td className="table-cell-center">
          <Button
            type="submit"
            className="btn btn-success btn-lg submit-button"
            style={{ fontSize: "18px" }}
            onClick={() => handleSubmit(request.requestID, request.status)}
          >
            Submit
          </Button>
        </td>
      </tr>
    );
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
          Holiday Requests
        </h2>
        <div className="shadow p-3 mb-5 bg-white rounded">
          <Card>
            <Card.Body>
              <div className="label-container">
                <label style={{ padding: "5px" }} htmlFor="nameFilter">
                  Filter by Name:{" "}
                </label>
                <input
                  type="text"
                  id="nameFilter"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                />
              </div>
              <div className="label-container">
                <label style={{ padding: "5px" }} htmlFor="statusFilter">
                  Filter by Status:{" "}
                </label>
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
              <div className="label-container">
                <label style={{ padding: "5px" }} htmlFor="yearFilter">
                  Filter by Year:
                </label>
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
                <Table className="table" striped bordered hover>
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
                    {filteredHolidayRequests.map((request) =>
                      renderHolidayRequestRow(request)
                    )}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ReviewRequests;
