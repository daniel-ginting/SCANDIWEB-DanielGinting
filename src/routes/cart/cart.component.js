import React, { Component, Fragment } from "react";

import CartItemsContext from "../../contexts/cart-items.context";
import { CurrenciesConsumer } from "../../contexts/currencies.context";

import "./cart.styles.scss";

class Cart extends Component {
  static contextType = CartItemsContext;
  render() {
    const {
      cartItems,
      addItem,
      reduceItem,
      totalPrice,
      attrValue,
      changeAttribute,
    } = this.context;
    return (
      <CurrenciesConsumer>
        {(props) => {
          const { currencies, index } = props;
          return (
            <div className="cart-container">
              <h1>CART</h1>

              {cartItems.map(
                ({ id, name, prices, imageUrl, quantity, attributes }) => (
                  <div key={id} className="cart-big-item">
                    <div className="cart-big-item-left">
                      <h1>{name}</h1>
                      <h2>
                        {currencies[index].symbol}
                        {prices[index].amount}
                      </h2>
                      {attributes.map((item) => (
                        <Fragment key={item.id}>
                          <h4 className="attribute-title">{item.name}</h4>
                          {item.items.map((attr) => (
                            <button
                              key={attr.id}
                              className={
                                item.type === "text"
                                  ? attr.id === attrValue(id, item.id)
                                    ? "button-selected"
                                    : "button-non"
                                  : attr.id === attrValue(id, item.id)
                                  ? "swatch-selected"
                                  : "swatch-non"
                              }
                              onClick={() => {
                                changeAttribute(id, item.id, attr);
                              }}
                              style={{ backgroundColor: attr.value }}
                            >
                              {item.type === "text" && attr.value}
                            </button>
                          ))}
                          <br />
                        </Fragment>
                      ))}
                    </div>
                    <div className="cart-big-item-right">
                      <div className="cart-big-item-right-group">
                        <button onClick={() => addItem(id)}>+</button>
                        <p>{quantity}</p>
                        <button onClick={() => reduceItem(id)}>-</button>
                      </div>
                      <img src={imageUrl} alt="product" />
                    </div>
                  </div>
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
