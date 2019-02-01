import React, { Component } from "react";
import {
  Button,
  Grid,
  Card,
  CircularProgress,
  CardContent,
  Typography,
  withStyles
} from "@material-ui/core";
import { Link } from "react-router-dom";

const style = theme => ({
  divBar: {
    overflowX: "scroll",
    whiteSpace: "nowrap",
    background: "#333",
    marginTop: "4em",
    [theme.breakpoints.down("md")]: {
      marginTop: "6.7em"
    }
  },
  cards: {
    width: "14em",
    boxShadow: "none",
    background: "inherit",
    textAlign: "center"
  }
});

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      apiLinks: [],
      cat: "",
      catProducts: [],
      searching: false
    };
    //  this.handleCatClick = this.handleCatClick.bind(this);
  }

  componentDidMount() {
    const apiLink =
      "https://affiliate-api.flipkart.net/affiliate/api/mrrajnish.json";

    fetch(`https://young-river-63704.herokuapp.com/${apiLink}`, {
      method: "GET",
      headers: {
        "Fk-Affiliate-Id": "mrrajnish",
        "Fk-Affiliate-Token": "68233d4f014d45d889cd0c3d382221b2"
      }
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data.apiGroups.affiliate.apiListings);
        // let apiListings = data.apiGroups.affiliate.apiListings;
        let categories = Object.keys(data.apiGroups.affiliate.apiListings);
        this.setState({ categories });
        const apiLinks = Object.values(data.apiGroups.affiliate.apiListings);
        this.setState({ apiLinks });
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state);
    const { classes } = this.props;
    return (
      <div style={{ textAlign: "center" }}>
        <div className={classes.divBar}>
          {this.state.categories &&
            this.state.categories.map((category, i) => (
              <Button
                style={{ display: "inline", color: "white" }}
                onClick={() => {
                  this.setState({ searching: true, catProducts: [], cat: "" });
                  let getLink = this.state.apiLinks[i].availableVariants[
                    "v1.1.0"
                  ].get;
                  fetch(`https://young-river-63704.herokuapp.com/${getLink}`, {
                    method: "GET",
                    headers: {
                      "Fk-Affiliate-Id": "mrrajnish",
                      "Fk-Affiliate-Token": "68233d4f014d45d889cd0c3d382221b2"
                    }
                  })
                    .then(res => res.json())
                    .then(data => {
                      console.log(data.products);
                      this.setState({
                        cat: category,
                        catProducts: data.products,
                        searching: false
                      });
                    })
                    .catch(err => console.log(err));
                }}
              >
                {category}
              </Button>
            ))}
        </div>
        {this.state.cat.length > 0 ? (
          <span>
            <h2>{this.state.cat.toUpperCase()}</h2>
            <hr />
          </span>
        ) : null}
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
          style={{ background: "white" }}
        >
          {this.state.catProducts.length
            ? this.state.catProducts.map(product => (
                <Grid item key={product.productBaseInfoV1.productId}>
                  <Link
                    to={`/product/${product.productBaseInfoV1.productId}`}
                    className="productCard"
                    style={{ textDecoration: "none" }}
                  >
                    <Card className={classes.cards}>
                      <CardContent>
                        <div style={{ minHeight: "200px" }}>
                          <img
                            className="productImg"
                            src={product.productBaseInfoV1.imageUrls["200x200"]}
                            alt={product.productBaseInfoV1.title}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%"
                            }}
                          />
                        </div>
                        <br />
                        <div style={{ padding: "1em 0" }}>
                          <Typography variant="subheading" gutterBottom>
                            {product.productBaseInfoV1.title.slice(0, 25) +
                              "... "}
                          </Typography>
                          <div>
                            {Object.values(
                              product.productBaseInfoV1.attributes
                            ).map((value, i) => (
                              <Typography
                                key={i}
                                variant="caption"
                                style={{
                                  display: "inline-block",
                                  marign: "0 0.6em"
                                }}
                              >
                                {value}
                              </Typography>
                            ))}
                          </div>
                          <div>
                            <Typography
                              variant="subheading"
                              style={{
                                color: "green",
                                display: "inline-block",
                                margin: "0 0.4em"
                              }}
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
                              style={{
                                textDecoration: "line-through",
                                display: "inline-block",
                                margin: "0 0.4em"
                              }}
                              gutterBottom
                            >
                              &#8377;
                              {
                                product.productBaseInfoV1.flipkartSellingPrice
                                  .amount
                              }
                            </Typography>
                          </div>
                          {/* <Typography variant="caption">
                            {product.productBaseInfoV1.categoryPath}
                          </Typography> */}
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
    );
  }
}

export default withStyles(style)(Landing);
