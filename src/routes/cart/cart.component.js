import React, { Component, Fragment } from "react";
import CartItem from "../../components/cart-item/cart-item.component";

import CartItemsContext from "../../contexts/cart-items.context";
import { CurrenciesConsumer } from "../../contexts/currencies.context";

import "./cart.styles.scss";

class Cart extends Component {
  static contextType = CartItemsContext;
  render() {
    const { cartItems, totalPrice, totalItems } = this.context;
    return (
      <CurrenciesConsumer>
        {(props) => {
          const { currencies, index } = props;
          return (
            <div className="cart-container">
              <h1>CART</h1>
              {cartItems.map(
                (
                  { id, name, prices, gallery, quantity, attributes, values },
                  i
                ) => (
                  <CartItem
                    key={i}
                    id={id}
                    name={name}
                    prices={prices}
                    gallery={gallery}
                    quantity={quantity}
                    attributes={attributes}
                    values={values}
                  />
                )
              )}
              <div className="h1-total">
                {currencies.length !== 0 && (
                  <Fragment>
                    <h2>
                      <span>Tax:</span> {currencies[index].symbol}15.00
                    </h2>
                    <h2>
                      <span>Qty:</span> {totalItems}
                    </h2>
                    <h1>
                      Total: {currencies[index].symbol} {totalPrice}
                    </h1>
                  </Fragment>
                )}
              </div>
              {console.log(props)}
              <button className="cart-order">ORDER</button>
            </div>
          );
        }}
      </CurrenciesConsumer>
    );
  }
}

export default Cart;
