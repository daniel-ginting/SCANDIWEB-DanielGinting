import React, { Component, createContext } from "react";
import CurrenciesContext from "./currencies.context";

const CartItemsContext = createContext({
  cartItems: [],
});

export const CartItemsConsumer = CartItemsContext.Consumer;

export class CartItemsProvider extends Component {
  static contextType = CurrenciesContext;
  constructor() {
    super();
    this.state = {
      cartItems: [],
    };
  }

  addItem = (id, values) => {
    const { cartItems } = this.state;

    cartItems[
      cartItems.findIndex((item) => {
        return Object.keys(values).every(
          (item2) => values[item2] === item.values[item2] && item.id === id
        );
      })
    ].quantity++;
    console.log("additem");
    this.setState({ cartItems });
  };

  reduceItem = (id, values) => {
    const { cartItems } = this.state;

    const index = cartItems.findIndex((item) => {
      return Object.keys(values).every(
        (item2) => values[item2] === item.values[item2] && item.id === id
      );
    });

    cartItems[index].quantity--;
    if (cartItems[index].quantity === 0) {
      cartItems.splice(index, 1);
    }

    this.setState({ cartItems });
  };

  addItemToCart = ({ id, name, prices, gallery, attributes, values }) => {
    const { cartItems } = this.state;
    cartItems.push({
      id,
      name,
      prices,
      gallery,
      attributes,
      quantity: 1,
      values,
    });
    this.setState({ cartItems });
  };

  quantity = (id, values) => {
    const { cartItems } = this.state;

    if (Object.keys(values).length === 0) {
      values.attr = 1;
    }

    const index = cartItems.findIndex((item) => {
      return Object.keys(values).every(
        (item2) => values[item2] === item.values[item2] && item.id === id
      );
    });
    if (cartItems[index] !== undefined) {
      return cartItems[index].quantity;
    } else {
      return 0;
    }
  };

  render() {
    const { cartItems } = this.state;
    const { addItem, reduceItem, addItemToCart, quantity } = this;
    const { index } = this.context;
    const totalItems = cartItems.reduce((i, n) => i + n.quantity, 0);
    const totalPrice =
      Math.round(
        cartItems.reduce((i, n) => i + n.quantity * n.prices[index].amount, 0) *
          100
      ) / 100;
    return (
      <CartItemsContext.Provider
        value={{
          cartItems,
          addItem,
          reduceItem,
          totalItems,
          addItemToCart,
          quantity,
          totalPrice,
        }}
      >
        {this.props.children}
      </CartItemsContext.Provider>
    );
  }
}

export default CartItemsContext;
