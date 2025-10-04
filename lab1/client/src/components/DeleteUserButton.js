import React from "react";
import client from "../apolloClient";
import { DELETE_USER } from "../graphql/mutations";
import { GET_USERS } from "../graphql/queries";
import { Button } from "react-bootstrap";

export default function DeleteUserButton({ userId }) {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      client
        .mutate({
          mutation: DELETE_USER,
          variables: { id: userId },
          refetchQueries: [{ query: GET_USERS }],
        })
        .then(() => {
          alert("✅ User deleted successfully!");
        })
        .catch((err) => {
          console.error("Error deleting user:", err);
          alert("❌ Failed to delete user");
        });
    }
  };

  return (
    <Button variant="danger" size="sm" onClick={handleDelete}>
      Delete
    </Button>
  );
}
