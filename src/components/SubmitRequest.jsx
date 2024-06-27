import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Layout from "./PageLayout/Layout";

function SubmitRequest() {
  // Retrieve user ID from localStorage
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userDataString = localStorage.getItem("holiday-tracker-user");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUserId(userData.userID); // Correctly access the userID field
    }
  }, []);

  // State variables to hold the selected start and end dates and total days
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalDays, setTotalDays] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare data for submission
    const requestData = {
      userID: userId,
      requestFrom: startDate,
      requestTo: endDate,
      status: "Pending", // Add status field with value "Pending"
    };

    try {
      // Send request to backend API to submit holiday request
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/HolidayRequest`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        console.log("Holiday request submitted successfully");
        // Clear form fields
        setStartDate(null);
        setEndDate(null);
        setTotalDays(null);
        setConfirmationMessage("Holiday request submitted successfully");
      } else {
        // Error submitting holiday request
        const errorMessage = await response.text(); // Get error message from response body
        console.error("Error submitting holiday request:", errorMessage);
        setConfirmationMessage(
          "Error submitting holiday request: " + errorMessage
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setConfirmationMessage("Error: " + error.message);
    }
  };

  // Function to handle date selection for start date
  const handleStartDateChange = (date) => {
    console.log("Selected Start Date:", date);
    setStartDate(date);
    calculateTotalDays(date, endDate);
  };

  // Function to handle date selection for end date
  const handleEndDateChange = (date) => {
    console.log("Selected End Date:", date);
    setEndDate(date);
    calculateTotalDays(startDate, date);
  };

  const calculateTotalDays = (start, end) => {
    if (start && end) {
      const timeDifference = end.getTime() - start.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1; // Including start and end date
      setTotalDays(daysDifference);
    } else {
      setTotalDays(null);
    }
  };

  return (
    // Form for submitting request
    <Layout>
      <form
        onSubmit={handleSubmit}
        style={{
          fontSize: "18px",
          marginTop: "150px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ padding: "25px" }}>Holiday Request</h2>
        {/* Input for selecting start date */}
        <div style={{ marginBottom: "30px" }}>
          <label style={{ padding: "15px" }}>Select Start Date:</label>
          <DatePicker
            id="startDate"
            selectsStart
            selected={startDate}
            onChange={handleStartDateChange}
            startDate={startDate}
            endDate={endDate}
            placeholderText="dd/mm/yyyy"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        {/* Input for selecting end date */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ padding: "15px" }}>Select End Date:</label>
          <DatePicker
            id="endDate"
            selectsEnd
            selected={endDate}
            onChange={handleEndDateChange}
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="dd/mm/yyyy"
            dateFormat="dd/MM/yyyy"
          />
        </div>

        {/* Total days display */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ padding: "15px" }}>Total Days:</label>
          <input
            type="text"
            value={totalDays !== null ? totalDays : ""}
            readOnly
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100px",
              textAlign: "center",
            }}
          />
        </div>

        {/* Submit button for form submission */}
        <button type="submit" className="btn btn-success btn-lg submit-button">
          Submit
        </button>
        {/* Confirmation message */}
        {confirmationMessage && <p>{confirmationMessage}</p>}
      </form>
    </Layout>
  );
}

export default SubmitRequest;
