import React, { Component, Fragment } from "react";
import ProductCard from "../product-card/product-card.component";

import { client } from "../..";
import { CATEGORY_QUERY } from "../../schema/schema";

import "./products-list.styles.scss";

class ProductsList extends Component {
  constructor() {
    super();
    this.state = {
      category: {},
    };
  }
  componentDidMount() {
    let arr = window.location.pathname.split("");
    arr.shift();
    let str;
    if (arr.length === 0) {
      str = this.props.firstCategory;
    } else {
      str = arr.join("");
    }
    client
      .query({
        query: CATEGORY_QUERY,
        variables: { input: { title: str } },
      })
      .then((result) => {
        this.setState({ category: result.data.category });
      });
  }
  render() {
    const { name, products } = this.state.category;
    return (
      <Fragment>
        {name && (
          <Fragment>
            <h1 className="epxksnu3">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </h1>
            <div className="products-list">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default ProductsList;
