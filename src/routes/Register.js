import React, { Component } from "react";
import {
  Container,
  Input,
  Header,
  Form,
  Button,
  Message
} from "semantic-ui-react";
import { Query, graphql } from "react-apollo";
import gql from "graphql-tag";

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      user {
        id
        email
        username
      }
      errors {
        path
        message
      }
    }
  }
`;

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      usernameError: "",
      emailError: "",
      passwordError: "",
      errors: []
    };
  }

  onSubmit = async e => {
    e.preventDefault();
    const response = await this.props.mutate({ variables: this.state });
    const { ok, errors } = response.data.register;
    if (ok) {
      this.props.history.push("/");
    } else {
      const err = {},
        errorList = [];
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      errors.forEach(({ path, message }) => {
        errorList.push(message);
      });
      await this.setState(err);
      await this.setState({ errors: errorList });
    }
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      username,
      email,
      password,
      emailError,
      passwordError,
      usernameError,
      errors
    } = this.state;
    return (
      <Container text>
        <Header as="h2">Register</Header>
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <Input
              fluid
              error={!!usernameError}
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
              error={!!emailError}
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
              error={!!passwordError}
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={this.onChange}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
        {usernameError || emailError || passwordError ? (
          <Message
            error
            header="There are some errors with your submission"
            list={errors}
          />
        ) : null}
      </Container>
    );
  }
}

export default graphql(registerMutation)(Register);
