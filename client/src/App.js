import React from "react";
import { BrowserRouter ,Router, Route, Switch } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Favorites from "./pages/Favorites";
import Homepage from "./pages/Homepage";
import User from "./pages/User";
import Navbar from "./components/Navbar";
// import Switch from "react-bootstrap/esm/Switch";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <>
      <Navbar />
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Homepage} />
          <Route path="/saved" component={Favorites} />
          <Route path="/user" component={User} />
        </Switch>
      </BrowserRouter>
    </>
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
