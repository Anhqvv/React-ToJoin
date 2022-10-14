import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoApp from "../assets/images/logo192.png";
import { NavLink } from "react-router-dom";

const Header = (props) => {
   return (
      <>
         <Navbar bg="light" expand="lg">
            <Container>
               <Navbar.Brand href="#home">
                  <img
                     src={logoApp}
                     alt=""
                     style={{
                        height: 40,
                        width: 40,
                     }}
                  />
                  React's App
               </Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                     <NavLink className="nav-link" to="/">
                        Home
                     </NavLink>
                     <NavLink className="nav-link" to="/users">
                        Manage User
                     </NavLink>
                  </Nav>
                  <Nav>
                     <NavDropdown title="Settings" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                        <NavDropdown.Item href="/logout">
                           Logout
                        </NavDropdown.Item>
                     </NavDropdown>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </>
   );
};

export default Header;
