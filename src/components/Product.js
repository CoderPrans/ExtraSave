import React, { Component } from "react";
import { Grid, Button, CircularProgress, Typography } from "@material-ui/core";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const apiLink =
      "https://affiliate-api.flipkart.net/affiliate/1.0/product.json?id=" +
      this.props.match.params.id;
    fetch(`https://young-river-63704.herokuapp.com/${apiLink}`, {
      method: "GET",
      headers: {
        "Fk-Affiliate-Id": "mrrajnish",
        "Fk-Affiliate-Token": "68233d4f014d45d889cd0c3d382221b2"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          loading: false,
          product: data
        });
        console.log(data);
      })
      .catch(err => console.log(err));
  }

  render() {
    const { product } = this.state;
    return (
      <div style={{ marginTop: "3.1em", padding: "3em" }}>
        {Object.keys(product).length ? (
          <Grid container direction="row" justify="space-around">
            <Grid item>
              {console.log(product)}
              <img
                src={product.productBaseInfoV1.imageUrls["400x400"]}
                alt={product.productBaseInfoV1.title}
                style={{ marginTop: "1em" }}
              />
            </Grid>
            <Grid item>
              <div style={{ marginTop: "1em", maxWidth: "40em" }}>
                <Typography variant="caption">
                  {product.productBaseInfoV1.categoryPath}
                </Typography>
                <br />
                <Typography variant="title">
                  {product.productBaseInfoV1.title}
                </Typography>
                <br />
                <div>
                  <Typography
                    variant="body2"
                    style={{
                      display: "inline-block",
                      margin: "0 0.2em",
                      padding: "0.1em 0.2em",
                      background: "green",
                      color: "white",
                      borderRadius: "3px"
                    }}
                  >
                    {product.productShippingInfoV1.sellerAverageRating}{" "}
                    <span>&#10022;</span>
                  </Typography>
                  <Typography
                    variant="caption"
                    style={{ display: "inline-block", margin: "0 0.2em" }}
                  >{`${
                    product.productShippingInfoV1.sellerNoOfReviews
                  } ratings & ${
                    product.productShippingInfoV1.sellerNoOfRatings
                  } reviews`}</Typography>
                </div>
                <br />
                <div>
                  <Typography
                    variant="headline"
                    style={{ display: "inline-block", margin: "0 0.2em" }}
                  >
                    <b>
                      &#8377;
                      {product.productBaseInfoV1.flipkartSpecialPrice.amount}
                    </b>
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      textDecoration: "line-through",
                      display: "inline-block",
                      margin: "0 0.2em"
                    }}
                  >
                    &#8377;
                    {product.productBaseInfoV1.flipkartSellingPrice.amount}
                  </Typography>
                  <Typography
                    variant="subheading"
                    style={{
                      display: "inline-block",
                      margin: "0 0.2em",
                      color: "green"
                    }}
                  >{`${
                    product.productBaseInfoV1.discountPercentage
                  }% off`}</Typography>
                </div>
                <Grid
                  container
                  direction="row"
                  justify="space-evenly"
                  alignItems="center"
                >
                  <Grid item>
                    <div>
                      <ul>
                        {product.productBaseInfoV1.offers.map((offer, i) => (
                          <Typography key={i} variant="body2">
                            {offer}
                          </Typography>
                        ))}
                      </ul>
                    </div>
                  </Grid>
                  <Grid item>
                    <a
                      style={{ textDecoration: "none" }}
                      href={product.productBaseInfoV1.productUrl}
                      target="_blank"
                    >
                      <Button variant="contained" color="secondary">
                        Buy Now
                      </Button>
                    </a>
                  </Grid>
                </Grid>
                <br />
                <Typography variant="subheading">
                  {product.productBaseInfoV1.productDescription}
                </Typography>
                <br />
                <div>
                  <p>Key Specs: </p>
                  <ul style={{ listStyle: "circle" }}>
                    {product.categorySpecificInfoV1.keySpecs.map((spec, i) => (
                      <li>
                        <Typography key={i} variant="subheading">
                          {spec}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </div>
                <Typography />
                <Typography variant="subheading">
                  {product.productShippingInfoV1.estimatedDeliveryTime}
                </Typography>
                <Typography variant="body1" style={{ color: "blue" }}>
                  {product.productShippingInfoV1.sellerName}
                </Typography>
              </div>
            </Grid>
          </Grid>
        ) : (
          this.state.loading && (
            <CircularProgress style={{ margin: "12em auto" }} size={70} />
          )
        )}
      </div>
    );
  }
}
export default Product;
