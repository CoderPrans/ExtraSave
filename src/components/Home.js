import React, { Component } from "react";
import {
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      flipkart: [],
      flipkartTop: [],
      amazon: [],
      snapdeal: []
    };
    this.searchStore = this.searchStore.bind(this);
  }

  componentDidMount() {
    // do the ajax stuff
    this.setState({ searching: true });
    const apiLink =
      "https://affiliate-api.flipkart.net/affiliate/1.0/search.json?query=&resultCount=10";

    fetch(`https://young-river-63704.herokuapp.com/${apiLink}`, {
      method: "GET",
      headers: {
        "Fk-Affiliate-Id": "mrrajnish",
        "Fk-Affiliate-Token": "68233d4f014d45d889cd0c3d382221b2"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ searching: false });
        console.log(data.products);
        this.setState({ flipkart: data.products });
        // this.props.products(data.products);
      })
      .catch(err => console.log(err));
  }

  searchStore(string) {
    this.setState({ searching: true, flipkart: [] });
    let apiString =
      "https://affiliate-api.flipkart.net/affiliate/1.0/search.json?query=" +
      string +
      "&resultCount=10";
    fetch(`https://cors-anywhere.herokuapp.com/${apiString}`, {
      method: "GET",
      headers: {
        "Fk-Affiliate-Id": "mrrajnish",
        "Fk-Affiliate-Token": "68233d4f014d45d889cd0c3d382221b2"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ searching: false });
        console.log(data.products);
        this.setState({ flipkart: data.products });
        this.props.products(data.products);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Navigation search={this.searchStore} />
        <div style={{ margin: "5.5em 0 1em 0", padding: "1em 2em" }}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
            style={{ background: "white" }}
          >
            {this.state.flipkart.length
              ? this.state.flipkart.map(product => (
                  <Grid item key={product.productBaseInfoV1.productId}>
                    <Link
                      to={`/product/${product.productBaseInfoV1.productId}`}
                      className="productCard"
                      style={{ textDecoration: "none" }}
                    >
                      <Card
                        style={{
                          width: "14em",
                          boxShadow: "none",
                          background: "inherit",
                          textAlign: "center"
                        }}
                      >
                        <CardContent>
                          <div style={{ minHeight: "200px" }}>
                            <img
                              className="productImg"
                              src={
                                product.productBaseInfoV1.imageUrls["200x200"]
                              }
                              alt={product.productBaseInfoV1.title}
                              style={{ width: "inherit" }}
                            />
                          </div>
                          <br />
                          <div style={{ padding: "1em 0" }}>
                            <Typography variant="title" gutterBottom>
                              {product.productBaseInfoV1.title.slice(0, 20) +
                                "... "}
                            </Typography>

                            <Typography
                              variant="subheading"
                              style={{ color: "green" }}
                              gutterBottom
                            >
                              &#8377;
                              {
                                product.productBaseInfoV1.flipkartSpecialPrice
                                  .amount
                              }
                            </Typography>
                            <Typography
                              variant="body1"
                              style={{ textDecoration: "line-through" }}
                              gutterBottom
                            >
                              &#8377;
                              {
                                product.productBaseInfoV1.flipkartSellingPrice
                                  .amount
                              }
                            </Typography>
                            <Typography variant="caption">
                              {product.productBaseInfoV1.categoryPath}
                            </Typography>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                ))
              : this.state.searching && (
                  <CircularProgress style={{ margin: "12em auto" }} size={70} />
                )}
          </Grid>
        </div>
      </div>
    );
  }
}

export default Home;
