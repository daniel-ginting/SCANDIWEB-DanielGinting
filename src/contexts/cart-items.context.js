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

  addItem = (id) => {
    const { cartItems } = this.state;

    cartItems[cartItems.findIndex((item) => item.id === id)].quantity++;

    this.setState({ cartItems });
  };

  reduceItem = (id) => {
    const { cartItems } = this.state;

    const index = cartItems.findIndex((item) => item.id === id);

    cartItems[index].quantity--;
    if (cartItems[index].quantity === 0) {
      cartItems.splice(index, 1);
    }

    this.setState({ cartItems });
  };

  addItemToCart = ({
    id,
    name,
    prices,
    gallery,
    attributes,
    value,
  }) => {
    const { cartItems } = this.state;
    const attributes2 = attributes.map((attribute, i) => {
      return {
        id: attribute.id,
        name: attribute.name,
        value: value[i] !== undefined ? value[i] : attribute.items[0],
        items: attribute.items,
        type: attribute.type,
      };
    });
    cartItems.push({
      id,
      name,
      prices,
      gallery,
      attributes: attributes2,
      quantity: 1,
    });

    this.setState({ cartItems });
  };

  quantity = (id) => {
    const { cartItems } = this.state;
    const index = cartItems.findIndex((item) => item.id === id);
    if (cartItems[index] !== undefined) {
      return cartItems[index].quantity;
    } else {
      return 0;
    }
  };

  changeAttribute = (itemId, attrId, value) => {
    let { cartItems } = this.state;
    const itemIndex = cartItems.findIndex((item) => item.id === itemId);
    if (itemIndex >= 0) {
      const attrIndex = cartItems[itemIndex].attributes.findIndex(
        (attr) => attr.id === attrId
      );
      cartItems[itemIndex].attributes[attrIndex].value = value;
      this.setState({ cartItems });
    }
  };

  attrValue = (itemId, attrId) => {
    let { cartItems } = this.state;
    const itemIndex = cartItems.findIndex((item) => item.id === itemId);
    if (itemIndex >= 0) {
      const attrIndex = cartItems[itemIndex].attributes.findIndex(
        (attr) => attr.id === attrId
      );
      return cartItems[itemIndex].attributes[attrIndex].value.id;
    }
  };

  render() {
    const { cartItems } = this.state;
    const {
      addItem,
      reduceItem,
      addItemToCart,
      quantity,
      attrValue,
      changeAttribute,
    } = this;
    const { index } = this.context;
    const totalItems = cartItems.reduce((i, n) => i + n.quantity, 0);
    const totalPrice = cartItems.reduce(
      (i, n) => i + n.quantity * n.prices[index].amount,
      0
    );
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
          changeAttribute,
          attrValue,
        }}
      >
        {this.props.children}
      </CartItemsContext.Provider>
    );
  }
}

export default CartItemsContext;
