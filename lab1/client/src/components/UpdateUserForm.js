import React, { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { UPDATE_USER } from "../graphql/mutations";
import { GET_USERS } from "../graphql/queries";
import { Button, Form } from "react-bootstrap";

export default function UpdateUserForm({ user }) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [age, setAge] = useState(user.age);
  const [companyId, setCompanyId] = useState(user.company?.id || "");

  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({
      variables: {
        id: user.id,
        firstName,
        age: parseInt(age),
        companyId,
      },
    });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="border rounded p-3 mt-3 bg-light shadow-sm"
    >
      <h5 className="mb-3 text-primary">Update {user.firstName}</h5>

      <Form.Group className="mb-2">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter first name"
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter age"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Company ID</Form.Label>
        <Form.Control
          type="text"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          placeholder="Enter company ID"
        />
      </Form.Group>

      <Button variant="success" type="submit" className="w-100">
        Update
      </Button>
    </Form>
  );
}
