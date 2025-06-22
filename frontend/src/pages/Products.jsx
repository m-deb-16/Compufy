import React from "react";
import PageHeader from "../components/PageHeader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
// import { useState, useEffect } from "react";
import ProductComp from "../components/ProductComp";
// import axios from "axios";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Products = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  return (
    <>
      <PageHeader />
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
          <main className="py-3">
            <Container>
              <h1>Products</h1>
              <Row>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <ProductComp product={product} />
                  </Col>
                ))}
              </Row>
            </Container>
          </main>
        </>
      )}
      {/* <Footer /> */}
    </>
  );
};

export default Products;
