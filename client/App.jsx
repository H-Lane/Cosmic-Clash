import React from 'react';
import { Outlet } from 'react-router-dom';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
// import Header from './components/Header';
import Home from './src/pages/Home';
import Signup from './src/pages/SignUp';
import Login from './src/pages/Login';
import Error from './src/pages/Error';
// import Game from './pages/Game'; 

// Set up Apollo Client
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Outlet />
    </ApolloProvider>
  );
};

export default App;