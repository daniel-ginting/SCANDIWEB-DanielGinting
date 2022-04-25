import React, { Component, Fragment } from "react";
import CartItem from "../../components/cart-item/cart-item.component";

import { ReactComponent as Caret } from "../../assets/cart-page-image-switch.svg";

import CartItemsContext from "../../contexts/cart-items.context";
import { CurrenciesConsumer } from "../../contexts/currencies.context";

import "./cart.styles.scss";

class Cart extends Component {
  static contextType = CartItemsContext;
  render() {
    const {
      cartItems,
      totalPrice,
    } = this.context;
    return (
      <CurrenciesConsumer>
        {(props) => {
          const { currencies, index } = props;
          return (
            <div className="cart-container">
              <h1>CART</h1>
              {cartItems.map(
                ({ id, name, prices, gallery, quantity, attributes }) => (
                  <CartItem
                    key={id}
                    id={id}
                    name={name}
                    prices={prices}
                    gallery={gallery}
                    quantity={quantity}
                    attributes={attributes}
                  />
                )
              )}
              <h1 className="h1-total">
                Total: {currencies[index].symbol} {totalPrice}
              </h1>
            </div>
          );
        }}
      </CurrenciesConsumer>
    );
  }
}

export default Cart;
