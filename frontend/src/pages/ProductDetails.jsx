// import products from "../components/products";
// import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import React from "react";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Container,
  Form,
} from "react-bootstrap";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import Message from "../components/Message";

const ProductDetails = () => {
  // const [product, setProduct] = useState({});
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      <PageHeader />
      <Container className="vh-100_pc">
        <Link className="btn btn-light my-3" to="/products">
          Go back
        </Link>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Container>
            <Message variant="danger">
              {isError?.data?.message || isError.error || "An error occurred"}{" "}
              {/* make message component with danger and success thing from bootstrap */}
            </Message>
          </Container>
        ) : (
          <>
            <Row>
              <Col md={5}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={4}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  {/* <ListGroup.Item>Price: ${product.price}</ListGroup.Item> */}
                  <ListGroup.Item>
                    Description: {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>₹ {product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out Of Stock"}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 ? (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(Number(e.target.value))}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ) : null}
                    {product.countInStock > 0 ? (
                      <ListGroup.Item>
                        <Button
                          className="btn-block"
                          type="button"
                          onClick={addToCartHandler}
                        >
                          Add To Cart
                        </Button>
                      </ListGroup.Item>
                    ) : null}
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
      {/* <Footer /> */}
    </>
  );
};

export default ProductDetails;
