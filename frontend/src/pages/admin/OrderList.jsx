import React from "react";
import PageHeader from "../../components/PageHeader";
import { Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Footer from "../../components/Footer";
import { useGetOrdersQuery } from "../../slices/orderApiSlice";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  return (
    <>
      <PageHeader />
      <Container className="mt-2">
        <h1>Orders</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>ID</th>
                <th style={{ textAlign: "center" }}>USER</th>
                {/* <th>DATE</th> */}
                <th style={{ textAlign: "center" }}>TOTAL</th>
                <th style={{ textAlign: "center" }}>ORDER DATE/PAID</th>
                <th style={{ textAlign: "center" }}>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td style={{ textAlign: "center" }}>{order._id}</td>
                  <td style={{ textAlign: "center" }}>
                    {order.user && order.user.name}
                  </td>
                  {/* <td>{order.createdAt?.substring(0, 10)}</td> */}
                  <td style={{ textAlign: "center" }}>₹ {order.totalPrice}</td>
                  <td style={{ textAlign: "center" }}>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
      {/* <Footer /> */}
    </>
  );
};

export default OrderList;
