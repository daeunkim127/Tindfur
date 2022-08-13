import React from "react";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache,  createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import Favorites from "./pages/Favorites";
import Homepage from "./pages/Homepage";
import User from "./pages/User";
import Navbar from "./components/Navbar";
import Auth from "./utils/auth";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    
      
      <Router>
        <div className='flex-colum justify-flex-start min-100-vh'>
        <Navbar />
        <div className="container">
        <Routes>
          <Route path="/" element={Auth.loggedIn() ? <User/> :<Homepage/>} />
          <Route path="/user" element={<User/> } />
          <Route path="/saved" element={ <Favorites/> } />
          
        </Routes>
        </div>
        </div>
      </Router>
      
    </ApolloProvider>
  );
}

export default App;
