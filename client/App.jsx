import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
// import Header from './components/Header';
import Home from './src/pages/Home';
import Signup from './src/pages/SignUp';
import Login from './src/pages/Login';
import Error from './src/pages/Error'
// import Game from './pages/Game'; 

// Set up Apollo Client
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
        <Routes>
          <Route path="*" element={<Error />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </ApolloProvider>
  );
};

export default App;