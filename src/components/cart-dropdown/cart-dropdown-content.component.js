import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import CartItemsContext from "../../contexts/cart-items.context";
import { CurrenciesConsumer } from "../../contexts/currencies.context";

import "./cart-dropdown-content.styles.scss";

class DropdownContent extends Component {
  static contextType = CartItemsContext;
  constructor() {
    super();
    this.ref = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  // Use this more complex method of clicking outside to be able to click the links inside the component
  handleClickOutside(event) {
    if (this.ref.current && !this.ref.current.contains(event.target)) {
      this.props.handleClick && this.props.handleClick();
    }
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  render() {
    const {
      cartItems,
      addItem,
      reduceItem,
      totalItems,
      totalPrice,
    } = this.context;
    return (
      <CurrenciesConsumer>
        {(props) => {
          const { index, currencies } = props;
          return (
            <Fragment>
              {currencies.length !== 0 && (
                <div className="dropdown__content" ref={this.ref}>
                  <h3>
                    My bag,{" "}
                    <span>
                      {totalItems} {totalItems > 1 ? "items" : "item"}
                    </span>
                  </h3>
                  <div className="mini-cart-items">
                    {cartItems.map(
                      (
                        {
                          id,
                          name,
                          prices,
                          quantity,
                          gallery,
                          attributes,
                          values,
                        },
                        i
                      ) => (
                        <div key={i} className="mini-cart-item">
                          <div className="mini-cart-item-box-1">
                            <h4>{name}</h4>
                            <h4 className="attribute-title">Price:</h4>
                            <p>
                              {currencies[index].symbol}
                              {prices[index].amount}
                            </p>
                            {attributes.map((item) => (
                              <Fragment key={item.id}>
                                <h4 className="attribute-title">{item.name}</h4>
                                {item.items.map((attr) => (
                                  <button
                                    key={attr.id}
                                    className={
                                      item.type === "text"
                                        ? attr.id === values[item.id]
                                          ? "button-selected"
                                          : "button-non"
                                        : attr.id === values[item.id]
                                        ? "swatch-selected"
                                        : "swatch-non"
                                    }
                                    style={{
                                      backgroundColor: attr.value,
                                    }}
                                  >
                                    {item.type === "text" && attr.value}
                                  </button>
                                ))}
                                <br />
                              </Fragment>
                            ))}
                          </div>
                          <div className="mini-cart-item-box-2">
                            <div className="mini-cart-item-amount">
                              <button onClick={() => addItem(id, values)}>
                                +
                              </button>
                              <p>{quantity}</p>
                              <button onClick={() => reduceItem(id, values)}>
                                -
                              </button>
                            </div>
                            <img src={gallery[0]} alt="product" />
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
                      <button
                        className="mini-cart-button-1"
                        onClick={this.props.handleClick}
                      >
                        VIEW BAG
                      </button>
                    </Link>
                    <Link to="/cart">
                      <button
                        className="mini-cart-button-2"
                        onClick={this.props.handleClick}
                      >
                        CHECK OUT
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </Fragment>
          );
        }}
      </CurrenciesConsumer>
    );
  }
}

export default DropdownContent;
