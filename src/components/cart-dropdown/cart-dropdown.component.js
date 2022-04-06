import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Cart } from "../../assets/cart.svg";

import "./cart-dropdown.styles.scss";

class CartDropdown extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }
  render() {
    return (
      <Fragment>
        {this.state.open === true ? <div className="overlay" /> : null}
        <Link
          className="dropdown"
          onMouseEnter={() =>
            this.setState({
              open: true,
            })
          }
          onMouseLeave={() =>
            this.setState({
              open: false,
            })
          }
          to="/cart"
        >
          <button>
            <Cart />
          </button>
          <div className="dropdown__content">
            <h3>
              My bag, <span>2 items</span>
            </h3>
            <div className="mini-cart-item">
              <div className="mini-cart-item-box-1">
                <h4>Apollo Running Shirt</h4>
                <p>$50.00</p>
                <button>s</button>
                <button>s</button>
              </div>
              <div className="mini-cart-item-box-2">
                <div className="mini-cart-item-amount">
                  <button>+</button>
                  <p>1</p>
                  <button>-</button>
                </div>
                <img />
              </div>
            </div>
            <div className="mini-cart-total">
              <h4>Total</h4>
              <h4>$100.00</h4>
            </div>
            <div className="mini-cart-buttons">
              <Link to="/cart">
                <button className="mini-cart-button-1">VIEW BAG</button>
              </Link>
              <button className="mini-cart-button-2">CHECK OUT</button>
            </div>
          </div>
        </Link>
      </Fragment>
    );
  }
}

export default CartDropdown;
