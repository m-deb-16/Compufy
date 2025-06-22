import React from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const PageHeader = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  console.log(cartItems);

  return (
    <>
      <header className="page-header">
        <Navbar expand="lg" collapseOnSelect>
          {" "}
          <Container>
            <Navbar.Brand>
              <Link to="/">
                <img
                  className="logo"
                  src="https://svgshare.com/i/109x.svg"
                  alt=""
                />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle
              className="pc_navButton"
              aria-controls="responsive-navbar-nav"
            />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto">
                <Link to="/" className="navLink">
                  <span className="navText">Home</span>
                </Link>
                <Link to="/products" className="navLink">
                  <span className="navText">Products</span>
                </Link>
                <Link to="/about" className="navLink">
                  <span className="navText">About Us</span>
                </Link>
                <Link to="/contact" className="navLink">
                  <span className="navText">Contact Us</span>
                </Link>
                {userInfo ? (
                  userInfo.isAdmin ? (
                    <NavDropdown
                      title="Admin"
                      id="adminmenu"
                      className="navLink"
                    >
                      <LinkContainer to="/admin/productlist">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/userlist">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orderlist">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <NavDropdown
                      title={userInfo.name}
                      id="username"
                      className="navLink"
                    >
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  )
                ) : (
                  <LinkContainer to="/login" className="navLink">
                    <span className="navText">Login</span>
                  </LinkContainer>
                )}
                <Link to="/cart" className="navLink">
                  <span className="navText">Cart</span>
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default PageHeader;
