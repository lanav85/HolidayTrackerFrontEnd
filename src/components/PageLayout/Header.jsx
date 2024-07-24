import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userString = localStorage.getItem("holiday-tracker-user");
    if (userString) {
      const userJson = JSON.parse(userString);
      if (userJson && userJson.data) {
        setUserData(JSON.parse(userJson.data));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("holiday-tracker-user");
  };

  return (
    <Navbar className="bg-body-tertiary fixed-top">
      <Container style={{ fontSize: "20px" }}>
        <Nav className="ms-auto">
          <NavDropdown title={userData?.name || "User"} id="basic-nav-dropdown">
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
