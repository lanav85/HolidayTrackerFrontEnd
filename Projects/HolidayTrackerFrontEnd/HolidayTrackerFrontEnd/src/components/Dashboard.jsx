import React, { useState, useEffect } from "react";
import "@/App.css";
import Card from "react-bootstrap/Card";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [holidayEntitlement, setHolidayEntitlement] = useState(null);

  useEffect(() => {
    // Retrieve user data from localStorage
    const userDataString = localStorage.getItem("holiday-tracker-user");
    const userData = JSON.parse(userDataString);
    setUserData(userData);

    // Fetch holiday entitlement using user ID
    if (userData) {
      fetchHolidayEntitlement(userData.id);
    }
  }, []);

  async function fetchHolidayEntitlement(userId) {
    try {
      const response = await fetch(
        `http://localhost:8080/RetrieveUserbyID/${userId}`
      ); // Adjust API endpoint accordingly
      if (!response.ok) {
        throw new Error("Failed to fetch holiday entitlement");
      }
      const userData = await response.json();
      setHolidayEntitlement(userData.holidayEntitlement);
    } catch (error) {
      console.error("Failed to fetch holiday entitlement:", error);
      // Handle error, e.g., display an error message to the user
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
          You have <span style={{ color: "red", fontWeight: "bold" }}>1</span>{" "}
          submitted vacation day pending approval.
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
