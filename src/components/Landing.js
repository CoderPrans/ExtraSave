import React, { Component } from "react";
import { Button, Grid, Card, CardContent, Typography } from "@material-ui/core";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      apiLinks: [],
      cat: "",
      catProducts: []
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
    return (
      <div>
        <div
          style={{
            overflowX: "scroll",
            whiteSpace: "nowrap",
            background: "#333",
            marginTop: "4em"
          }}
        >
          {this.state.categories &&
            this.state.categories.map((category, i) => (
              <Button
                style={{ display: "inline", color: "white" }}
                onClick={() => {
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
                        catProducts: data.products
                      });
                    })
                    .catch(err => console.log(err));
                }}
              >
                {category}
              </Button>
            ))}
        </div>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
          style={{ background: "white" }}
        >
          {this.state.catProducts.length
            ? this.state.catProducts.map(product => (
                <Grid item key={product.productBaseInfoV1.productId}>
                  <a
                    className="productCard"
                    href={product.productBaseInfoV1.productUrl}
                    style={{ textDecoration: "none" }}
                    target="_blank"
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
                        <img
                          className="productImg"
                          src={product.productBaseInfoV1.imageUrls["200x200"]}
                          alt={product.productBaseInfoV1.title}
                          style={{ width: "inherit" }}
                        />
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
                            {product.productBaseInfoV1.flipkartSpecialPrice
                              .amount
                              ? product.productBaseInfoV1.flipkartSpecialPrice
                                  .amount
                              : null}
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
                  </a>
                </Grid>
              ))
            : null}
        </Grid>
      </div>
    );
  }
}

export default Landing;
