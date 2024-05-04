import React, { useState, useEffect } from "react";
import "@/App.css";
import Card from "react-bootstrap/Card";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [holidayEntitlement, setHolidayEntitlement] = useState(null);
  const [pendingRequests, setPendingRequestsCount] = useState(0);

  useEffect(() => {
    //useEffect is typically used when you need to perform side effects in a component, such as fetching data from an API
    // Retrieve user data from localStorage
    const userDataString = localStorage.getItem("holiday-tracker-user");
    const userData = JSON.parse(userDataString);
    setUserData(userData); //this syntax is to automatically update the data without reendering the page again

    // Fetch holiday entitlement using user ID
    if (userData) {
      //this syntax means: if userData isn't null

      getHolidayEntitlement(userData.id);
      getPendingHolidays(userData.id);
    }
  }, []);

  async function getHolidayEntitlement(userId) {
    try {
      const response = await fetch(
        `http://localhost:8080/users?userId=${userId}`
      ); // Adjust API endpoint accordingly
      if (!response.ok) {
        throw new Error("Failed to fetch holiday entitlement");
      }
      const userData = await response.json(); //convert the fecthed data into json format
      setHolidayEntitlement(userData.holidayEntitlement);
    } catch (error) {
      console.error("Failed to fetch holiday entitlement:", error);
    }
  }
  async function getPendingHolidays(userId) {
    try {
      const response = await fetch(
        `http://localhost:8080/holidayRequests?userId=${userId}&status=Pending`
      ); // Adjust API endpoint accordingly
      if (!response.ok) {
        throw new Error("Failed to fetch pending requests");
      }
      const pendingRequests = await response.json(); //convert the fecthed data into json format
      const pendingRequestsCount = pendingRequests.length;
      setPendingRequestsCount(pendingRequestsCount);
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
          {holidayEntitlement !== null && (
            <>
              You have{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>
                {holidayEntitlement}
              </span>{" "}
              vacation days left.
            </>
          )}
        </Card.Body>
        <Card.Body>
          You have{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>
            {pendingRequests}
          </span>{" "}
          submitted vacation request{pendingRequests !== 1 ? "s" : ""} pending
          approval.
        </Card.Body>
        <Card.Body>
          Request holiday for{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>June 24th</span>{" "}
          has been rejected by your manager.
        </Card.Body>
      </Card>
    </div>
  );
}

export default Dashboard;
