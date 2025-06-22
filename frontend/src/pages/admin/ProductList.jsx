import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import { Table, Button, Row, Col, Container } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import PageHeader from "../../components/PageHeader";

const ProductList = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  // const [createProduct, { isLoading: loadingCreate }] =
  //   useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted successfully");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  // const createProductHandler = async () => {
  //   if (window.confirm("Are you sure you want to create a new product?")) {
  //     try {
  //       await createProduct();
  //       refetch();
  //     } catch (err) {
  //       toast.error(err?.data?.message || err.error);
  //     }
  //   }
  // };
  return (
    <>
      <PageHeader />
      <Container>
        <Row className="align-items-center">
          <Col>
            <h1>Products</h1>
          </Col>
          {/* <Col className="text-end">
            <Button className="my-3" onClick={createProductHandler}>
              <FaPlus /> Create Product
            </Button>
          </Col> */}
        </Row>
        {/* {loadingCreate && <Loader />} */}
        {loadingDelete && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>ID</th>
                  <th style={{ textAlign: "center" }}>NAME</th>
                  <th style={{ textAlign: "center" }}>PRICE</th>
                  <th style={{ textAlign: "center" }}>CATEGORY</th>
                  <th style={{ textAlign: "center" }}>BRAND</th>
                  <th style={{ textAlign: "center" }}></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td style={{ textAlign: "center" }}>{product._id}</td>
                    <td style={{ textAlign: "center" }}>{product.name}</td>
                    <td style={{ textAlign: "center" }}>₹ {product.price}</td>
                    <td style={{ textAlign: "center" }}>{product.category}</td>
                    <td style={{ textAlign: "center" }}>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm mx-2">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* PAGINATE PLACEHOLDER */}
          </>
        )}
      </Container>
    </>
  );
};

export default ProductList;
