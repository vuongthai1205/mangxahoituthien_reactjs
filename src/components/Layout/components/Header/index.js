import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap"; // Import components from react-bootstrap
import Image from "react-bootstrap/Image";
import { MyUserContext } from "../../../../App";
function Header() {
  const [user, dispatch] = useContext(MyUserContext);
  const handleLogout = () => {
    dispatch({
      type: "logout",
    });
  };
  return (
    <Navbar
      data-bs-theme="dark"
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary">
      <Navbar.Brand className="px-2" as={Link} to="/">
        Mạng xã hội từ thiện
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Trang chủ
          </Nav.Link>
          <Nav.Link as={Link} to="/profile">
            Trang cá nhân
          </Nav.Link>
        </Nav>
        {user !== null ? (
          <Nav>
            <NavDropdown
              title={
                <>
                  <Image
                    className="mr-2"
                    width="30"
                    height="30"
                    roundedCircle
                    src={user.avatar}
                  />
                  Hello {user.username}
                </>
              }
              id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ) : (
          <Nav>
            <Nav.Link as={Link} to="/login">
              Đăng nhập
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              Đăng ký
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
