import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

function Header() {
  const handleLogout = () => {
    localStorage.removeItem("holiday-tracker-user");
  };
  return (
    <Navbar className="bg-body-tertiary fixed-top">
      <Container
        style={{
          fontSize: "20px",
        }}
      >
        <Nav className="ms-auto">
          <NavDropdown title="UserName" id="basic-nav-dropdown">
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
