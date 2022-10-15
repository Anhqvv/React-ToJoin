import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoApp from "../assets/images/logo192.png";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = (props) => {
   const navigate = useNavigate();
   const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/");
      toast.success("Logout is succeed");
   };
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
                        <NavLink className="dropdown-item" to="/login">
                           Login
                        </NavLink>

                        <NavDropdown.Item onClick={() => handleLogout()}>
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
