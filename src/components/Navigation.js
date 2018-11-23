import React, { Component } from "react";
import { InputBase, AppBar, Toolbar, Grid } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import logo from "../Capture.png";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      string: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    e.preventDefault();
    this.setState({ string: e.target.value });
  }
  render() {
    return (
      <AppBar position="fixed" style={{ background: "#077AD5" }}>
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid Item>
              <img src={logo} alt="logo" width={206} />
            </Grid>
            <Grid item>
              <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
                style={{ margin: "1em" }}
              >
                <Grid item>
                  {" "}
                  <InputBase
                    id="searchString"
                    placeholder="i wanna buy...."
                    value={this.state.string}
                    onChange={this.handleChange}
                    type="text"
                    style={{
                      color: "white",
                      background: "rgb(255, 255, 255, 0.1)",
                      padding: "0.3em",
                      borderRadius: "2.5px"
                    }}
                  />
                </Grid>
                <Grid item>
                  {/* <Button
                    mini
                    variant="fab"
                    aria-label="Search"
                    style={{ background: "#F9D423" }}
                  > */}
                  <Search
                    style={{
                      cursor: "pointer",
                      fontSize: "2em",
                      color: "#F9D423"
                    }}
                    onClick={() => this.props.search(this.state.string)}
                  />
                  {/* </Button> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navigation;
