import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/submit-request">Submit Request</Link>
    </div>
  );
}

export default Navigation;
