import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//Imported Library from https://refine.dev/blog/react-date-picker/#using-two-separate-components

function SubmitRequest() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Start Date:", formatDate(startDate));
    console.log("End Date:", formatDate(endDate));
  };

  const formatDate = (date) => {
    if (!date) return "";

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        fontSize: "15px",
        marginLeft: "calc(25% + 60px)",
        marginRight: "10%",
        marginTop: "150px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
      <button
        type="submit"
        class="btn btn-success btn-lg"
        color="primary"
        style={{ backgroundColor: "purple", marginTop: "20px" }}
      >
        Submit
      </button>
    </form>
  );
}

export default SubmitRequest;
