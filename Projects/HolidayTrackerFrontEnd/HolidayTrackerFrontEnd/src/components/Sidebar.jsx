import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

export default  function Sidebar() {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
    <CDBSidebar textColor="#fff" backgroundColor="#6f42c1">
      <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}></a>
      </CDBSidebarHeader>

      <CDBSidebarContent className="sidebar-content">
        <CDBSidebarMenu>
          <NavLink exact to="/" >
            <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
          </NavLink>
          
          <NavLink exact to="/profile">
            <CDBSidebarMenuItem icon="user">Profile </CDBSidebarMenuItem>
          </NavLink>

          <NavLink exact to="/submit-request">
            <CDBSidebarMenuItem icon="calendar-plus">Submit Request </CDBSidebarMenuItem>
          </NavLink>
          
          <NavLink exact to="/review-requests" >
            <CDBSidebarMenuItem icon="calendar">Review Requests </CDBSidebarMenuItem>
          </NavLink>

          <NavLink exact to="/manage-employees">
            <CDBSidebarMenuItem icon="users">Manage Employees </CDBSidebarMenuItem>
          </NavLink>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter style={{ textAlign: 'center' }}>
        <div
          style={{
            padding: '20px 5px',
          }}
        >
          Sidebar Footer
        </div>
      </CDBSidebarFooter>
    </CDBSidebar>
  </div>
  );
}

