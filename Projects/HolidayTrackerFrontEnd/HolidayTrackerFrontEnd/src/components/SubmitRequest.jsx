import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/App.css";

// Imported Library from https://refine.dev/blog/react-date-picker/#using-two-separate-components

function SubmitRequest() {
  // State variables to hold the selected start and end dates
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Start Date:", formatDate(startDate));
    console.log("End Date:", formatDate(endDate));
  };

  // Function to format date as dd/MM/yyyy
  const formatDate = (date) => {
    if (!date) return "";

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    // Form for submitting request

    <form
      onSubmit={handleSubmit}
      style={{
        fontSize: "16px",
        marginLeft: "calc(25% + 60px)",
        marginRight: "10%",
        marginTop: "150px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {" "}
      <h2 style={{ padding: "25px" }}> Holiday Request </h2>
      {/* Input for selecting start date */}
      <div style={{ marginBottom: "30px" }}>
        <label style={{ padding: "15px" }}>Select Start Date:</label>
        <DatePicker
          id="startDate"
          selectsStart
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          startDate={startDate}
          endDate={endDate}
          placeholderText="dd/MM/yyyy"
          dateFormat="dd/MM/yyyy"
        />
      </div>
      {/* Input for selecting end date */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ padding: "15px" }}>Select End Date: </label>
        <DatePicker
          id="endDate"
          selectsEnd
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="dd/MM/yyyy"
          dateFormat="dd/MM/yyyy"
        />
      </div>
      {/* Submit button triggers form submission */}
      <button type="submit" className="btn btn-success btn-lg submit-button">
        Submit
      </button>
    </form>
  );
}

export default SubmitRequest;
