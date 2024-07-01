import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

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
      const response = await fetch(`/api/users?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch holiday entitlement");
      }
      const userData = await response.json();
      setHolidayEntitlement(userData.holidayEntitlement);
    } catch (error) {
      console.error("Failed to fetch holiday entitlement:", error);
    }
  }
  //Getting pending requests from the department
  async function getPendingHolidays(departmentId) {
    try {
      const response = await fetch(
        `/api/holidayRequests?departmentId=${departmentId}&status=Pending`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch pending requests");
      }
      const pendingRequests = await response.json();
      const pendingRequestsCount = pendingRequests.length;
      setPendingRequestsCount(pendingRequestsCount);
    } catch (error) {
      console.error("Failed to fetch pending requests:", error);
    }
  }

  //Getting pending requests from the user
  async function getUserPendingHolidays(userId) {
    try {
      const response = await fetch(
        `/api/holidayRequests?userId=${userId}&status=Pending`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch pending requests");
      }
      const pendingRequests = await response.json();
      const pendingRequestsCount = pendingRequests.length;
      setUserPendingRequestsCount(pendingRequestsCount);
    } catch (error) {
      console.error("Failed to fetch pending requests:", error);
    }
  }

  return (
    <div className="moveToRight-container">
      <div style={{ marginTop: "100px", padding: "20px" }}>
        {userData && <h1>Hello, {userData.name}!</h1>}
      </div>
      <Card style={{ width: "40rem" }}>
        <Card.Header
          style={{
            backgroundColor: "purple",
            fontWeight: "bold",
            color: "white",
          }}
        >
          Notifications
        </Card.Header>

        <Card.Body>
          You have{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>
            {holidayEntitlement}
          </span>{" "}
          vacation days left.
        </Card.Body>

        <Card.Body>
          You have{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>
            {pendingRequests}
          </span>{" "}
          pending vacation request{pendingRequests !== 1 ? "s" : ""} awaiting
          for your approval.
        </Card.Body>

        <Card.Body>
          You have{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>
            {userPendingRequests}
          </span>{" "}
          vacation request{userPendingRequests !== 1 ? "s" : ""} awaiting for
          your supervisor approval.
        </Card.Body>
      </Card>
    </div>
  );
}
//

export default Dashboard;
