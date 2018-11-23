import React, { Component } from "react";
import Home from "./components/Home";
import Landing from "./components/Landing";
import { Button, AppBar, Toolbar } from "@material-ui/core";
import logo from "./Capture.png";
// import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <AppBar position="fixed" style={{ background: "#077AD5" }}>
            <Toolbar>
              {" "}
              <img src={logo} alt="logo" width={206} />
              <Link to="/category">
                <Button
                  style={{ margin: "1em" }}
                  variant="contained"
                  color="primary"
                >
                  By Category
                </Button>
              </Link>
              <Link to="/home">
                <Button
                  style={{ margin: "1em" }}
                  variant="contained"
                  color="primary"
                >
                  By Query
                </Button>
              </Link>
            </Toolbar>
          </AppBar>
          <Route path="/home" component={Home} />
          <Route path="/category" component={Landing} />
        </div>
      </Router>
    );
  }
}

export default App;
