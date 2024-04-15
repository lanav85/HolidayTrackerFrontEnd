import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
    return (
        <Navbar className="bg-body-tertiary fixed-top"> {/* Add fixed-top class */}
          <Container style={{ fontSize: '20px' }}>
              <Nav className="ms-auto">
                
                <NavDropdown title="UserName" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
          </Container>
        </Navbar>
      );
}

export default Header;
