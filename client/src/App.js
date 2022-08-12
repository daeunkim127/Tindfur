import React from "react";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Favorites from "./pages/Favorites";
import Homepage from "./pages/Homepage";
import User from "./pages/User";
import Navbar from "./components/Navbar";
import Auth from "./utils/auth";

const client = new ApolloClient({
  uri: "/graphql",
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
          <Route path="/" element={<Homepage />} />
          <Route path="/saved" element={Auth.loggedIn() ? <Favorites/> :<Homepage/>} />
          <Route path="/user" element={Auth.loggedIn() ? <User/> :<Homepage/>} />
        </Routes>
        </div>
        </div>
      </Router>
      
    </ApolloProvider>

    //  <ApolloProvider client={client}>
    //     <Router>
    //       <>
    //         <Routes>
    //           <Route  path="/" exact component={Homepage} />
    //           <Route  path="/saved" component={Favorites} />
    //           <Route  path="/user" component={User} />
    //           <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
    //         </Routes>
    //       </>
    //     </Router>
    //   </ApolloProvider>
  );
}

export default App;
