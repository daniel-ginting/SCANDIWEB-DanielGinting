import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Cart } from "../../assets/cart.svg";

import CartItemsContext from "../../contexts/cart-items.context";
import { CurrenciesConsumer } from "../../contexts/currencies.context";

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
    const {
      cartItems,
      addItem,
      reduceItem,
      totalItems,
      totalPrice,
      attrValue,
      changeAttribute,
    } = this.context;
    return (
      <CurrenciesConsumer>
        {(props) => {
          const { index, currencies } = props;
          return (
            <Fragment>
              {currencies.length !== 0 && (
                <Fragment>
                  {this.state.open === true ? (
                    <div className="overlay" />
                  ) : null}
                  <div
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
                  >
                    <Link to="/cart">
                      <Cart />
                    </Link>
                    <div className="dropdown__content">
                      <h3>
                        My bag,{" "}
                        <span>
                          {totalItems} {totalItems > 1 ? "items" : "item"}
                        </span>
                      </h3>
                      <div className="mini-cart-items">
                        {cartItems.map(
                          ({
                            id,
                            name,
                            prices,
                            quantity,
                            imageUrl,
                            attributes,
                          }) => (
                            <div key={id} className="mini-cart-item">
                              <div className="mini-cart-item-box-1">
                                <h4>{name}</h4>
                                <h4 className="attribute-title">Price:</h4>
                                <p>
                                  {currencies[index].symbol}
                                  {prices[index].amount}
                                </p>

                                {attributes.map((item) => (
                                  <Fragment key={item.id}>
                                    <h4 className="attribute-title">
                                      {item.name}
                                    </h4>
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
                                {/* <button>s</button> */}
                                {/* <br/> */}
                                {/* <button>s</button>
                              <button>s</button> */}
                              </div>
                              <div className="mini-cart-item-box-2">
                                <div className="mini-cart-item-amount">
                                  <button onClick={() => addItem(id)}>+</button>
                                  <p>{quantity}</p>
                                  <button onClick={() => reduceItem(id)}>
                                    -
                                  </button>
                                </div>
                                <img src={imageUrl} alt="product" />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                      <div className="mini-cart-total">
                        <h4>Total</h4>
                        <h4>
                          {currencies[index].symbol}
                          {totalPrice}
                        </h4>
                      </div>
                      <div className="mini-cart-buttons">
                        <Link to="/cart">
                          <button className="mini-cart-button-1">
                            VIEW BAG
                          </button>
                        </Link>
                        <button className="mini-cart-button-2">
                          CHECK OUT
                        </button>
                      </div>
                    </div>
                  </div>
                </Fragment>
              )}
            </Fragment>
          );
        }}
      </CurrenciesConsumer>
    );
  }
}

export default CartDropdown;
