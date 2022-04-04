import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./product-card.styles.scss";

class ProductCard extends Component {
  render() {
    const { title, price } = this.props.product;
    return (
      <Link className="product-card" to="/description">
        <div className="product-image" />
        <div className="product-text">
          <h2>{title}</h2>
          <p>{price}</p>
        </div>
      </Link>
    );
  }
}

export default ProductCard;
