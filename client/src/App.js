import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import Favorites from "./pages/Favorites";
import Homepage from "./pages/Homepage";
// import User from "./pages/User";
// import Navbar from "./components/Navbar";
// import Switch from "react-bootstrap/esm/Switch";

function App() {
  return (
    // <p>hello world</p>
    <>
<Homepage />
        {/* <Navbar /> */}
    </>
    // <Router>
    //   <>
    //     <Switch>
    //       <Route exact path="/" component={Homepage} />
    //       <Route exact path="/saved" component={Favorites} />
    //       <Route exact path="/user" component={User} />
    //       <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
    //     </Switch>
    //   </>
    // </Router>
  );
}

export default App;
