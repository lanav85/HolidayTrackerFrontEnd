import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import * as api from "../../api/ApiRequests";
import "../../css/Dashboard.css";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [pendingRequests, setPendingRequestsCount] = useState(0);
  const [totalStaff, setTotalStaffCount] = useState(0);
  const [approvedRequests, setApprovedRequestsCount] = useState(0);
  const [roleID, setRoleID] = useState(null);
  const [departmentName, setDepartmentName] = useState("");
  const [holidayEntitlement, setHolidayEntitlement] = useState(null);
  const [pendingRequestsIbyUserId, setPendingRequestsCountbyUserId] =
    useState(0);
  const [approvedRequestsbyUserId, setApprovedRequestsCountbyUserId] =
    useState(0);

  useEffect(() => {
    const userDataString = localStorage.getItem("holiday-tracker-user");
    const userJson = JSON.parse(userDataString);

    if (userJson) {
      const userData = JSON.parse(userJson.data);
      setUserData(userData);
      setRoleID(userJson.roleID);

      api.getDepartment(userJson.departmentID, (result) => {
        setDepartmentName(result.departmentName);

        getHolidayEntitlement(userJson.userID);
        getPendingHolidayRequestsByUserId(userJson.userID);
        getApprovedRequestsByUserId(userJson.userID);
      });

      if (userJson.roleID === 1) {
        // Admin view: Get all pending holidays, total staff, and approved requests
        getAllPendingHolidayRequests();
        getTotalStaffCount();
        getAllApprovedHolidayRequests();
      } else if (userJson.roleID === 2) {
        // Departmental user view: Get department-specific data
        getPendingHolidaysByDepartment(userJson.departmentID);
        getTotalStaffByDepartment(userJson.departmentID);
        getApprovedRequestsByDepartment(userJson.departmentID);
      }
    }
  }, []);

  function getApprovedRequestsByUserId(userId) {
    api.getApprovedHolidayRequestsByUserId(
      userId,
      (approvedRequests) => {
        setApprovedRequestsCountbyUserId(approvedRequests.length);
      },
      (error) =>
        console.error("Failed to fetch approved requests by user ID:", error)
    );
  }
  async function getPendingHolidayRequestsByUserId(userId) {
    try {
      api.getPendingHolidayRequestsByUserId(userId, (pendingRequests) => {
        setPendingRequestsCountbyUserId(pendingRequests.length);
      });
    } catch (error) {
      console.error("Failed to fetch pending requests:", error);
    }
  }
  async function getHolidayEntitlement(userId) {
    try {
      api.getUser(userId, (userData) => {
        setHolidayEntitlement(userData.holidayEntitlement);
      });
    } catch (error) {
      console.error("Failed to fetch holiday entitlement:", error);
    }
  }
  function getAllPendingHolidayRequests() {
    api.getAllPendingHolidayRequests(
      (pendingRequests) => {
        setPendingRequestsCount(pendingRequests.length);
      },
      (error) => console.error("Failed to fetch pending holidays:", error)
    );
  }
  async function getPendingHolidaysByDepartment(departmentId) {
    try {
      api.getPendingHolidayRequestsByDepartmentId(
        departmentId,
        (pendingRequests) => {
          setPendingRequestsCount(pendingRequests.length);
        }
      );
    } catch (error) {
      console.error("Failed to fetch pending requests:", error);
    }
  }
  function getTotalStaffCount() {
    api.getAllUsers(
      (users) => {
        setTotalStaffCount(users.length);
      },
      (error) => console.error("Failed to fetch total staff count:", error)
    );
  }
  function getTotalStaffByDepartment(departmentId) {
    api.getUsersByDepartmentId(
      departmentId,
      (users) => {
        setTotalStaffCount(users.length);
      },
      (error) =>
        console.error("Failed to fetch total staff count by department:", error)
    );
  }
  function getAllApprovedHolidayRequests() {
    api.getApprovedHolidayRequests(
      (approvedRequests) => {
        setApprovedRequestsCount(approvedRequests.length);
      },
      (error) => console.error("Failed to fetch approved requests:", error)
    );
  }
  function getApprovedRequestsByDepartment(departmentId) {
    api.getApprovedHolidayRequestsByDepartmentId(
      departmentId,
      (approvedRequests) => {
        setApprovedRequestsCount(approvedRequests.length);
      },
      (error) =>
        console.error("Failed to fetch approved requests by department:", error)
    );
  }
  return (
    <div className="moveToRight-container" style={{ paddingBottom: "50px" }}>
      <div style={{ marginTop: "100px", padding: "10px" }}>
        {userData && <h1>Hello, {userData.name}!</h1>}
      </div>
      <div className="container mt-4">
        {(roleID === 1 || roleID === 2) && (
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <h3>{departmentName} Overview</h3>
              <div className="card-container">
                <Card className="text-center custom-card shadow-sm">
                  <div className="corner-icon bg-dark text-purple">
                    <i className="fas fa-users"></i>
                  </div>
                  <Card.Body>
                    <Card.Title>{totalStaff}</Card.Title>
                    <Card.Text>Total Staff</Card.Text>
                  </Card.Body>
                </Card>
                <Card className="text-center custom-card shadow-sm">
                  <div className="corner-icon bg-dark text-purple">
                    <i className="fas fa-check"></i>
                  </div>
                  <Card.Body>
                    <Card.Title>{approvedRequests}</Card.Title>
                    <Card.Text>Approved Leave</Card.Text>
                  </Card.Body>
                </Card>
                <Card className="text-center custom-card shadow-sm">
                  <div className="corner-icon bg-dark text-purple">
                    <i className="fas fa-clock"></i>
                  </div>
                  <Card.Body>
                    <Card.Title>{pendingRequests}</Card.Title>
                    <Card.Text>Pending Leave</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Card.Body>
          </Card>
        )}
      </div>
      <div className="container mt-4">
        <Card className="p-4 shadow-sm">
          <Card.Body>
            <h3> My Overview</h3>
            <div className="card-container">
              <Card className="text-center custom-card shadow-sm">
                <div className="corner-icon bg-dark text-purple">
                  <i class="fas fa-calendar"></i>
                </div>
                <Card.Body>
                  <Card.Title>{holidayEntitlement}</Card.Title>
                  <Card.Text>Holiday Balance</Card.Text>
                </Card.Body>
              </Card>
              <Card className="text-center custom-card shadow-sm">
                <div className="corner-icon bg-dark text-purple">
                  <i className="fas fa-check"></i>
                </div>
                <Card.Body>
                  <Card.Title>{approvedRequestsbyUserId}</Card.Title>
                  <Card.Text>Approved Leave</Card.Text>
                </Card.Body>
              </Card>
              <Card className="text-center custom-card shadow-sm">
                <div className="corner-icon bg-dark text-purple">
                  <i className="fas fa-clock"></i>
                </div>
                <Card.Body>
                  <Card.Title>{pendingRequestsIbyUserId}</Card.Title>
                  <Card.Text>Pending Leave</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
