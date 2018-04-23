import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { render } from "react-dom";
// import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
// import thunk from 'redux-thunk';

import Feed from './components/Feed';
const client = new ApolloClient({
  uri: "https://graphql.z-dn.net/xf",
  connectToDevTools: true
});

const root = document.getElementById('js-root');

if (root) {
  // const store = createClientStore();

  ReactDOM.render(
    <ApolloProvider client={client}>
      <Feed />
    </ApolloProvider>, root);
}
