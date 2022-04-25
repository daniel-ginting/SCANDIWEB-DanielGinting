import React, { Component, Fragment } from "react";

import { ReactComponent as Caret } from "../../assets/cart-page-image-switch.svg";

import CartItemsContext from "../../contexts/cart-items.context";
import { CurrenciesConsumer } from "../../contexts/currencies.context";

import "./cart-item.styles.scss";

class CartItem extends Component {
  static contextType = CartItemsContext;
  constructor() {
    super();
    this.state = {
      imageIndex: 0,
    };
  }

  prevImage = (length) => {
    let num = this.state.imageIndex;
    if (num === 0) {
      this.setState({
        imageIndex: length - 1,
      });
    } else {
      this.setState({
        imageIndex: num - 1,
      });
    }
  };

  nextImage = (length) => {
    let num = this.state.imageIndex;
    if (num === length - 1) {
      this.setState({
        imageIndex: 0,
      });
    } else {
      this.setState({
        imageIndex: num + 1,
      });
    }
  };

  render() {
    const { addItem, reduceItem, attrValue, changeAttribute } = this.context;
    const { id, name, prices, gallery, quantity, attributes } = this.props;
    return (
      <CurrenciesConsumer>
        {(props) => {
          const { currencies, index } = props;
          return (
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
                <div className="sjfhslw">
                  <img src={gallery[this.state.imageIndex]} alt="product" />
                  {gallery.length > 1 && (
                    <Fragment>
                      <Caret
                        onClick={() => this.prevImage(gallery.length)}
                        className="image-caret image-caret-left"
                      />
                      <Caret
                        onClick={() => this.nextImage(gallery.length)}
                        className="image-caret image-caret-right"
                      />
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          );
        }}
      </CurrenciesConsumer>
    );
  }
}

export default CartItem;
