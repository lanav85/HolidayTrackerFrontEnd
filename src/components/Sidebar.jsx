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
import "css/Sidebar.css";
import logo from "img/logo.png";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <CDBSidebar textColor="#fff" backgroundColor="#82029b">
        <CDBSidebarHeader className="sidebar-header">
          <img src={logo} alt="Logo" className="logo" />
          <p className="title">Holiday Tracker</p>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/dashboard">
              <CDBSidebarMenuItem icon="columns" className="sidebar-menu-item">
                Dashboard
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/profile">
              <CDBSidebarMenuItem icon="user" className="sidebar-menu-item">
                Profile{" "}
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/submit-request">
              <CDBSidebarMenuItem
                icon="calendar-plus"
                className="sidebar-menu-item"
              >
                Submit Holiday Request{" "}
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/review-requests">
              <CDBSidebarMenuItem icon="calendar" className="sidebar-menu-item">
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

        <CDBSidebarFooter className="sidebar-footer">
          <div style={{ padding: "20px 5px" }}>Version 1.0.0</div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}
