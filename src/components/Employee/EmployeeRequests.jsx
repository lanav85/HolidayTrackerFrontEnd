import React, { useState, useEffect } from "react";
import * as api from "../../api/ApiRequests";
import "bootstrap/dist/css/bootstrap.min.css";

const HolidayRequestsTable = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const userDataString = localStorage.getItem("holiday-tracker-user");
        const userJson = JSON.parse(userDataString);

        if (userJson) {
          const userId = userJson.userID;

          const onSuccess = (data) => {
            setRequests(data);
          };

          const onError = (error) => {
            console.error("Failed to fetch requests by user ID:", error);
          };

          await api.getHolidayRequestsByUserId(userId, onSuccess, onError);
        }
      } catch (error) {
        console.error("Failed to fetch requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const getRowClassName = (status) => {
    switch (status) {
      case "Rejected":
        return "table-danger"; // Red
      case "Approved":
        return "table-success"; // Green
      case "Pending":
        return "table-warning"; // Yellow
      default:
        return "";
    }
  };

  // Sort requests by status (assuming 'Pending', 'Approved', 'Rejected' are the statuses and this order is desired)
  const sortedRequests = [...requests].sort((a, b) => {
    const statusOrder = { Pending: 1, Approved: 2, Rejected: 3 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <div className="moveToRight-container">
      <div>
        <h2
          style={{
            textAlign: "center",
          }}
        >
          My Holiday Requests
        </h2>
        {requests.length === 0 ? (
          <div className="alert alert-info" role="alert">
            You don't have holiday requests yet.
          </div>
        ) : (
          <div className="shadow p-3 mb-5 bg-white rounded">
            <table className="table ">
              <thead>
                <tr>
                  <th>Request From</th>
                  <th>Request To</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedRequests.map((request) => (
                  <tr
                    key={request.requestID}
                    className={getRowClassName(request.status)}
                  >
                    <td>{request.requestFrom}</td>
                    <td>{request.requestTo}</td>
                    <td>{request.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>{" "}
    </div>
  );
};

export default HolidayRequestsTable;
