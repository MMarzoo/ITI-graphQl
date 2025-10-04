import React from "react";
import { ApolloProvider } from "@apollo/client/react";
import client from "./apolloClient";
import UserList from "./components/UserList";
import CreateUserForm from "./components/CreateUserForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Row, Col, Card } from "react-bootstrap";

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#">GraphQL Users Manager</Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <Row>
          <Col md={4}>
            <Card className="p-3 shadow-sm mb-4">
              <h4 className="text-center mb-3">Add New User</h4>
              <CreateUserForm />
            </Card>
          </Col>

          <Col md={8}>
            <Card className="p-3 shadow-sm">
              <UserList />
            </Card>
          </Col>
        </Row>
      </Container>
    </ApolloProvider>
  );
}

export default App;
