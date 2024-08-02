import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Layout from "./PageLayout/Layout";
import * as api from "../api/ApiRequests";
import moment from "moment";
import "moment-timezone";
import { Card } from "react-bootstrap";

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

      // Call the API to create the department
      api.createHolidayRequest(
        requestData,
        (data) => {
          // Clear form fields
          setConfirmationMessage(data);
          if (data === "Holiday Request successfully created") {
            setStartDate(null);
            setEndDate(null);
            setTotalDays(null);
          }
        },
        (error) => {
          console.error("Error submitting holiday request:", error);
          setConfirmationMessage("Error submitting holiday request: " + error);
        }
      );
    } catch (error) {
      console.error("Error:", error);
      setConfirmationMessage("Error: " + error.message);
    }
  };

  const setOtherZone = (date) => {
    //moment.tz.setDefault('America/Los_Angeles');
    const dateWithoutZone = moment(date).format("YYYY-MM-DDTHH:mm:ss.SSS");
    const otherZone = moment.tz(date, "UTC").format("Z");
    const dateWithOtherZone = [dateWithoutZone, otherZone].join("");
    return new Date(dateWithOtherZone);
  };

  // Function to handle date selection for start date
  const handleStartDateChange = (date) => {
    let utcDate = setOtherZone(date); //moment(date).utc().toDate();
    console.log("Selected Start Date:", utcDate);
    setStartDate(utcDate);
    calculateTotalDays(utcDate, endDate);
  };

  // Function to handle date selection for end date
  const handleEndDateChange = (date) => {
    let utcDate = setOtherZone(date); //moment(date).utc().toDate();
    console.log("Selected End Date:", utcDate);
    setEndDate(utcDate);
    calculateTotalDays(startDate, utcDate);
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
    <div className="moveToRight-container">
      <div>
        <h2
          style={{
            textAlign: "center",
          }}
        >
          Holiday Request
        </h2>

        <div className="shadow p-3 mb-5 bg-white rounded">
          <Layout>
            <form
              onSubmit={handleSubmit}
              style={{
                fontSize: "18px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
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
                  minDate={moment.utc().toDate()}
                  placeholderText="dd/mm/yyyy"
                  dateFormat="dd/MM/yyyy"
                  timeZone="UTC"
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
                  minDate={moment.utc().toDate()}
                  placeholderText="dd/mm/yyyy"
                  dateFormat="dd/MM/yyyy"
                  timeZone="UTC"
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
              <button
                type="submit"
                className="btn btn-success btn-lg submit-button"
              >
                Submit
              </button>
              {/* Confirmation message */}
              {confirmationMessage && <p>{confirmationMessage}</p>}
            </form>
          </Layout>
        </div>
      </div>{" "}
    </div>
  );
}

export default SubmitRequest;
