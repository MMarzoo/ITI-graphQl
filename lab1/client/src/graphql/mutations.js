import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($firstName: String!, $age: Int!, $companyId: ID) {
    createUser(firstName: $firstName, age: $age, companyId: $companyId) {
      id
      firstName
      age
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $firstName: String, $age: Int, $companyId: ID) {
    updateUser(
      id: $id
      firstName: $firstName
      age: $age
      companyId: $companyId
    ) {
      id
      firstName
      age
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
