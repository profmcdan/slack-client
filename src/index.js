import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import Routes from "./routes";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import "semantic-ui-css/semantic.min.css";

// Create a client
const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:8080/graphql" }),
  cache: new InMemoryCache()
});

// Test

const GET_USERS = gql`
  {
    getUsers {
      id
      email
      username
    }
  }
`;

client.query({ query: GET_USERS }).then(response => console.log(response.data));

const Users = ({ onUserSelected }) => (
  <Query query={GET_USERS}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      return (
        <select name="user" onChange={onUserSelected}>
          {data.getUsers.map(user => (
            <option key={user.id} value={user.username}>
              {user.email}
            </option>
          ))}
        </select>
      );
    }}
  </Query>
);

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
