import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import * as api from "../../api/ApiRequests";
import "../../css/Dashboard.css";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [holidayEntitlement, setHolidayEntitlement] = useState(null);
  const [pendingRequests, setPendingRequestsCount] = useState(0);
  const [userPendingRequests, setUserPendingRequestsCount] = useState(0);

  useEffect(() => {
    // Retrieve user data from localStorage
    const userDataString = localStorage.getItem("holiday-tracker-user");
    const user_json = JSON.parse(userDataString);

    if (user_json) {
      const userData = JSON.parse(user_json.data);
      setUserData(userData);

      // Fetch holiday entitlement and pending requests using user ID
      getHolidayEntitlement(user_json.userID);
      getPendingHolidays(user_json.departmentID);
      getUserPendingHolidays(user_json.userID);
    }
  }, []);

  async function getHolidayEntitlement(userId) {
    try {
      api.getUser(userId, (userData) => {
        setHolidayEntitlement(userData.holidayEntitlement);
      });
    } catch (error) {
      console.error("Failed to fetch holiday entitlement:", error);
    }
  }

  // Getting pending requests from the department
  async function getPendingHolidays(departmentId) {
    try {
      api.getPendingHolidayRequestsByDepartmentId(
        departmentId,
        (pendingRequests) => {
          const pendingRequestsCount = pendingRequests.length;
          setPendingRequestsCount(pendingRequestsCount);
        }
      );
    } catch (error) {
      console.error("Failed to fetch pending requests:", error);
    }
  }

  // Getting pending requests from the user
  async function getUserPendingHolidays(userId) {
    try {
      api.getPendingHolidayRequestsByUserId(userId, (pendingRequests) => {
        const pendingRequestsCount = pendingRequests.length;
        setUserPendingRequestsCount(pendingRequestsCount);
      });
    } catch (error) {
      console.error("Failed to fetch pending requests:", error);
    }
  }

  return (
    <div className="moveToRight-container">
      <div style={{ marginTop: "100px", padding: "20px" }}>
        {userData && <h1>Hello, {userData.name}!</h1>}
      </div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <Card className="text-center custom-card">
              <div className="corner-icon bg-dark text-white">
                <i className="fas fa-users"></i>
              </div>
              <Card.Body>
                <Card.Title>Total Staffs</Card.Title>
                <Card.Text>{/* Insert total staffs count here */}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-3">
            <Card className="text-center custom-card">
              <div className="corner-icon bg-dark text-white">
                <i className="fas fa-check"></i>
              </div>
              <Card.Body>
                <Card.Title>Approved Leave</Card.Title>
                <Card.Text>{/* Insert approved leave count here */}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-3">
            <Card className="text-center custom-card">
              <div className="corner-icon bg-dark text-white">
                <i className="fas fa-clock"></i>
              </div>
              <Card.Body>
                <Card.Title>Pending Leave</Card.Title>
                <Card.Text>{pendingRequests}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-3">
            <Card className="text-center custom-card">
              <div className="corner-icon bg-dark text-white">
                <i className="fas fa-times"></i>
              </div>
              <Card.Body>
                <Card.Title>Rejected Leave</Card.Title>
                <Card.Text>{/* Insert rejected leave count here */}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
