import React from "react";
import { useQuery } from "@apollo/client/react";
import { GET_USERS } from "../graphql/queries";
import DeleteUserButton from "./DeleteUserButton";
import UpdateUserForm from "./UpdateUserForm";
import { Spinner, ListGroup } from "react-bootstrap";

export default function UserList() {
  const { data, loading, error } = useQuery(GET_USERS);

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <p className="text-danger">Error: {error.message}</p>;

  return (
    <div>
      <h3 className="mb-3">Users List</h3>
      <ListGroup>
        {data.users.map((user) => (
          <ListGroup.Item key={user.id}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{user.firstName}</strong> ({user.age}) -{" "}
                {user.company?.name || "No Company"}
              </div>
              <div>
                <DeleteUserButton userId={user.id} />
              </div>
            </div>
            <div className="mt-2">
              <UpdateUserForm user={user} />
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
