import React, { Component } from "react";
import Home from "./components/Home";
import Landing from "./components/Landing";
import { Button, AppBar, Toolbar, Grid } from "@material-ui/core";
import logo from "./Capture.png";
import Product from "./components/Product";
// import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <AppBar position="fixed" style={{ background: "#077AD5" }}>
            <Toolbar>
              <Grid
                container
                direciton="row"
                justify="space-between"
                alignItems="center"
              >
                {" "}
                <Grid item>
                  <img src={logo} alt="logo" width={206} />
                </Grid>
                <Grid item>
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
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Route path="/home" component={Home} />
          <Route path="/category" component={Landing} />
          <Route path="/product/:id" component={Product} />
        </div>
      </Router>
    );
  }
}

export default App;
