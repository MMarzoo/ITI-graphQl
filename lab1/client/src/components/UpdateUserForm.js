import React, { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { UPDATE_USER } from "../graphql/mutations";
import { GET_USERS } from "../graphql/queries";

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
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <h4>Update {user.firstName}</h4>
      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input value={age} onChange={(e) => setAge(e.target.value)} type="number" />
      <input value={companyId} onChange={(e) => setCompanyId(e.target.value)} />
      <button type="submit">Update</button>
    </form>
  );
}