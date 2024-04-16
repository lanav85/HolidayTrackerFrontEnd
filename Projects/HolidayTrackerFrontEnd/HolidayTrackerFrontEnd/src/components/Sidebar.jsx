import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import "@/App.css";

export default function Sidebar() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        zIndex: 2002,
      }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#82029b">
        <CDBSidebarHeader>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          ></a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/dashboard">
              <CDBSidebarMenuItem
                icon="columns"
                className="sidebar-menu-item"
                style={{ marginBottom: "30px" }}
              >
                Dashboard
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/profile">
              <CDBSidebarMenuItem
                icon="user"
                className="sidebar-menu-item"
                style={{ marginBottom: "30px" }}
              >
                Profile{" "}
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/submit-request">
              <CDBSidebarMenuItem
                icon="calendar-plus"
                className="sidebar-menu-item"
                style={{ marginBottom: "30px" }}
              >
                Submit Holiday Request{" "}
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/review-requests">
              <CDBSidebarMenuItem
                icon="calendar"
                className="sidebar-menu-item"
                style={{ marginBottom: "30px" }}
              >
                Review Holiday Requests{" "}
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/manage-employees">
              <CDBSidebarMenuItem icon="users" className="sidebar-menu-item">
                Manage Employees{" "}
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center", fontSize: "10px" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          >
            Version 1.0.0
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}
