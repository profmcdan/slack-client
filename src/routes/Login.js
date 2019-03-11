import React from "react";
import { extendObservable } from "mobx";
import { observer } from "mobx-react";
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

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

class Login extends React.Component {
  constructor(props) {
    super(props);
    extendObservable(this, {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      err: {},
      errorList: []
    });
  }

  onChange = e => {
    const { name, value } = e.target;
    this[name] = value;
  };

  onSubmit = async e => {
    e.preventDefault();
    const { email, password } = this;
    const response = await this.props.mutate({
      variables: { email, password }
    });
    console.log(response);
    const { ok, token, refreshToken, errors } = response.data.login;
    if (ok) {
      // Save the tokens in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
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
      this.errors = errorList;
      console.log(this.errors);
      // await this.setState(err);
      // await this.setState({ errors: errorList });
    }
  };

  render() {
    const { email, password, emailError, passwordError, errors } = this;
    return (
      <Container text>
        <Header as="h2">Login</Header>
        <Form onSubmit={this.onSubmit}>
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
        {emailError || passwordError ? (
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

export default graphql(loginMutation)(observer(Login));
