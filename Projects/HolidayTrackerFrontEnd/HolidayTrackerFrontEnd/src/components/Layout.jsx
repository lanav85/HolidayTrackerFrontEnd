// Layout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import Container from "react-bootstrap/Container";

const Layout = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <Header />
      {/* Container for main content, children represents content passed to Layout */}

      <Container fluid style={{ marginTop: "60px" }}>
        {children}
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
