import React, { Component } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Cart } from "../../assets/white-cart.svg";

import "./product-card.styles.scss";

class ProductCard extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }
  render() {
    const { title, price } = this.props.product;
    return (
      <Link
        onMouseEnter={() => this.setState({ open: true })}
        onMouseLeave={() => this.setState({ open: false })}
        className="product-card"
        to="/description"
      >
        <div className="product-image" />
        {this.state.open ? (
          <button className="product-circle">
            <Cart className="product-cart" />
          </button>
        ) : null}
        <div className="product-text">
          <h2>{title}</h2>
          <p>{price}</p>
        </div>
      </Link>
    );
  }
}

export default ProductCard;
