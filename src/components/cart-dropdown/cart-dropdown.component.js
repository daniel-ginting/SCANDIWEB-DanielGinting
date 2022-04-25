import React, { Component, Fragment } from "react";

import DropdownContent from "./cart-dropdown-content.component";
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
        <div className="dropdown">
          <button
            onClick={() => {
              this.setState({ open: true });
            }}
          >
            <Cart />
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
