import React from "react";
import "@/App.css";
import Card from "react-bootstrap/Card";

function Dashboard() {
  return (
    <div className="moveToRight-container">
      <div style={{ marginTop: "100px", padding: "20px" }}>
        <h1>Hello, UserName!</h1>
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
          You have <span style={{ color: "red", fontWeight: "bold" }}>2</span>{" "}
          vacation days left.
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
