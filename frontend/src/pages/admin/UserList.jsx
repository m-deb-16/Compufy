import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Container } from "react-bootstrap";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";
import PageHeader from "../../components/PageHeader";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id);
        toast.success("User deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <PageHeader />
      <Container>
        <h1>Users</h1>
        {loadingDelete && <Loader />}
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
                <th style={{ textAlign: "center" }}>NAME</th>
                <th style={{ textAlign: "center" }}>EMAIL</th>
                <th style={{ textAlign: "center" }}>ADMIN</th>
                <th style={{ textAlign: "center" }}></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td style={{ textAlign: "center" }}>{user._id}</td>
                  <td style={{ textAlign: "center" }}>{user.name}</td>
                  <td style={{ textAlign: "center" }}>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default UserList;
