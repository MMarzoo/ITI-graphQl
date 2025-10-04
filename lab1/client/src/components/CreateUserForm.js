import React, { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_USER } from "../graphql/mutations";
import { GET_USERS } from "../graphql/queries";
import { Button, Form } from "react-bootstrap";

export default function CreateUserForm() {
  const [firstName, setFirstName] = useState("");
  const [age, setAge] = useState("");
  const [companyId, setCompanyId] = useState("");

  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser({ variables: { firstName, age: parseInt(age), companyId } });
    setFirstName("");
    setAge("");
    setCompanyId("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Control
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Name"
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Control
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          type="number"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          placeholder="Company ID"
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100">
        Create User
      </Button>
    </Form>
  );
}
