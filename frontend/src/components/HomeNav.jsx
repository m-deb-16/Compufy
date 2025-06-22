import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const HomeNav = () => {
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

  const [scrolled, setScrolled] = useState(false);
  const [unstuck, setUnstuck] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > window.innerHeight) {
      setUnstuck(true);
    } else {
      setUnstuck(false);
    }

    if (scrollY > 50) {
      setScrolled(true);
    } else if (scrollY <= 50) {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header>
      <div
        className={`pc_navParent d-none d-sm-none d-md-none d-lg-block d-xl-block ${
          scrolled ? "scrolled" : ""
        } ${unstuck ? "unstuck" : ""}`}
      >
        <div className="pc_navContainer">
          <div className="pc_navLinkContainer">
            <div className="pc_logo">
              <Link to="/">
                <img
                  className="logo"
                  src="https://svgshare.com/i/109x.svg"
                  alt=""
                />
              </Link>
            </div>
            <div className="pc_navLinks">
              {/* <Link to="/" className="navLink">
                <span className="navText">Search</span>
              </Link> */}
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
                  <NavDropdown title="Admin" id="adminmenu" className="navLink">
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
            </div>
          </div>
          <div className="pc_Est">
            <Link to="/contact" className="navLink pc_getQuote">
              <span className="navText">Get a free quote</span>
            </Link>
          </div>
        </div>
      </div>

      <Navbar
        className={`pc_mobile d-lg-none ${scrolled ? "scrolled" : ""} ${
          unstuck ? "unstuck" : ""
        }`}
        expand="lg"
        collapseOnSelect
      >
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
              ) : (
                <LinkContainer to="/login" className="navLink">
                  <span className="navText">Login</span>
                </LinkContainer>
              )}
              <Link to="/cart" className="navLink">
                <span className="navText">Cart</span>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default HomeNav;
