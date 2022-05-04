import { Component, Fragment } from "react";
import { client } from "../../index";
import parse from "html-react-parser";

import { PRODUCT_QUERY } from "../../schema/schema";

import { CurrenciesConsumer } from "../../contexts/currencies.context";
import { CartItemsConsumer } from "../../contexts/cart-items.context";

import "./description.styles.scss";

class Description extends Component {
  constructor() {
    super();
    this.state = {
      product: null,
      imageIndex: 0,
      selectAttr: {},
    };
  }

  componentDidMount() {
    let arr = window.location.pathname.split("");
    arr.shift();
    let str = arr.join("");
    client
      .query({
        query: PRODUCT_QUERY,
        variables: { id: str },
      })
      .then((result) => this.setState({ product: result.data.product }));
  }

  handleChangeObject = (attr, value) => {
    const { selectAttr } = this.state;
    selectAttr[attr] = value;
    this.setState({ selectAttr });
    console.log(selectAttr);
  };

  render() {
    const attrClass = (type, value, id) => {
      if (type === "text") {
        if (value === id) {
          return "description-attributes-selected";
        } else {
          return "description-attributes";
        }
      } else if (type === "swatch") {
        if (value === id) {
          return "description-attributes swatch-selected";
        } else {
          return "description-attributes swatch";
        }
      }
    };
    const isAttr = (type, id, state) => {
      return attrClass(type, state, id);
    };
    const handleAdd = (addItemToCart, addItem, quantity) => {
      const selectAttr = Object.assign({}, this.state.selectAttr);
      this.state.product.attributes.forEach((item) => {
        if (selectAttr[item.id] === undefined) {
          selectAttr[item.id] = item.items[0].id;
        }
      });
      this.setState({ selectAttr });
      quantity(
        this.state.product.id,
        this.state.selectAttr
      ) === 0 ?
      addItemToCart({
        id: this.state.product.id,
        name: this.state.product.name,
        prices: this.state.product.prices,
        gallery: this.state.product.gallery,
        attributes: this.state.product.attributes,
        values: Object.assign({}, selectAttr),
      }) : 
      addItem(
        this.state.product.id,
        Object.assign({}, this.state.selectAttr)
      )
    };
    return (
      <CurrenciesConsumer>
        {(props) => {
          const { index } = props;
          return (
            <CartItemsConsumer>
              {(props2) => {
                const { cartItems, quantity, addItemToCart, addItem } = props2;
                return (
                  <Fragment>
                    {this.state.product !== null && (
                      <div className="description-main">
                        <div className="description-pictures">
                          {this.state.product.gallery.map((url, i) => (
                            <img
                              key={url}
                              className="description-picture"
                              src={url}
                              alt="Product"
                              onClick={() => {
                                this.setState({ imageIndex: i });
                              }}
                            />
                          ))}
                        </div>
                        <div className="description-container-1">
                          <img
                            className="description-image"
                            src={
                              this.state.product.gallery[this.state.imageIndex]
                            }
                            alt="product"
                          />
                          <div className="description-info">
                            <h1>{this.state.product.brand}</h1>
                            <h2>{this.state.product.name}</h2>

                            {/* ATTRIBUTES */}
                            {this.state.product.attributes.map((item, i) => {
                              return (
                                <Fragment key={item.name}>
                                  <h3>{item.name.toUpperCase()}:</h3>
                                  <ul>
                                    {item.items.map((attr) => (
                                      <li
                                        key={attr.value}
                                        className={isAttr(
                                          item.type,
                                          attr.id,
                                          this.state.selectAttr[item.id] !==
                                            undefined
                                            ? this.state.selectAttr[item.id]
                                            : ""
                                        )}
                                      >
                                        <button
                                          onClick={() => {
                                            this.handleChangeObject(
                                              item.id,
                                              attr.id
                                            );
                                            console.log(cartItems);
                                          }}
                                          style={{
                                            backgroundColor: attr.value,
                                          }}
                                        >
                                          {item.type === "text" && attr.value}
                                        </button>
                                      </li>
                                    ))}
                                  </ul>
                                </Fragment>
                              );
                            })}
                            {/* END OF ATTRIBUTES */}
                            <h3>PRICE:</h3>
                            <h2 className="description-price">
                              {`${this.state.product.prices[index].currency.symbol} ${this.state.product.prices[index].amount}`}
                            </h2>
                            {this.state.product.inStock ? (
                              <button
                                onClick={() => {handleAdd(addItemToCart, addItem, quantity)
                                }}
                                className="description-big-button"
                              >
                                ADD TO CART
                              </button>
                            ) : (
                              <button className="description-big-button nostock">
                                OUT OF STOCK
                              </button>
                            )}
                            <div className="description-description">
                              {parse(this.state.product.description)}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Fragment>
                );
              }}
            </CartItemsConsumer>
          );
        }}
      </CurrenciesConsumer>
    );
  }
}

export default Description;
