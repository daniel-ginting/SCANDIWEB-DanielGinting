import React, { Component, Fragment } from "react";

import DropdownContent from "./cart-dropdown-content.component";
import { ReactComponent as Cart } from "../../assets/cart.svg";

import CartItemsContext from "../../contexts/cart-items.context";

import "./cart-dropdown.styles.scss";

class CartDropdown extends Component {
  static contextType = CartItemsContext;
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
        <div className="dropdown">
          <button
            onClick={() => {
              this.setState({ open: true });
            }}
          >
            <Cart />
            {this.context.totalItems > 0 && (
              <div className="cart-circle">{this.context.totalItems}</div>
            )}
          </button>
          {this.state.open ? (
            <DropdownContent
              handleClick={() => this.setState({ open: false })}
            />
          ) : null}
        </div>
      </Fragment>
    );
  }
}

export default CartDropdown;
