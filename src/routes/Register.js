import React, { Component } from "react";
import { Container, Input, Header, Form, Button } from "semantic-ui-react";
import { Query, graphql } from "react-apollo";
import gql from "graphql-tag";

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
  }
`;

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      error: ""
    };
  }

  onSubmit = async e => {
    e.preventDefault();
    const response = await this.props.mutate({ variables: this.state });
    console.log(response);
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, email, password } = this.state;
    return (
      <Container text>
        <Header as="h2">Register</Header>
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <Input
              fluid
              type="text"
              placeholder="Username"
              value={username}
              name="username"
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <Input
              fluid
              type="text"
              placeholder="Email"
              value={email}
              name="email"
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <Input
              fluid
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={this.onChange}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    );
  }
}

export default graphql(registerMutation)(Register);
