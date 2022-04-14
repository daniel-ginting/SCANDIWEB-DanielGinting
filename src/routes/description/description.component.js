import { Component, Fragment } from "react";
import { gql } from "@apollo/client";
import { client } from "../../index";
import parse from "html-react-parser";

import { CurrenciesConsumer } from "../../contexts/currencies.context";
import { CartItemsConsumer } from "../../contexts/cart-items.context";

import { ReactComponent as Add } from "../../assets/description-add.svg";
import { ReactComponent as Reduce } from "../../assets/description-reduce.svg";

import "./description.styles.scss";

class Description extends Component {
  constructor() {
    super();
    this.state = {
      product: null,
      selectedAtrributeId: [],
      selectedAtrribute: [],
    };
  }

  componentDidMount() {
    let arr = window.location.pathname.split("");
    arr.shift();
    let str = arr.join("");
    client
      .query({
        query: gql`
          query ($id: String!) {
            product(id: $id) {
              id
              name
              gallery
              description
              attributes {
                id
                name
                type
                items {
                  displayValue
                  value
                  id
                }
              }
              prices {
                amount
                currency {
                  symbol
                }
              }
              brand
            }
          }
        `,
        variables: { id: str },
      })
      .then((result) => this.setState({ product: result.data.product }));
  }

  handleAttribute = (i, id, attr) => {
    const { selectedAtrributeId, selectedAtrribute } = this.state;
    selectedAtrributeId[i] = id;
    selectedAtrribute[i] = attr;
    this.setState({ selectedAtrributeId });
    this.setState({ selectedAtrribute });
  };

  render() {
    return (
      <CurrenciesConsumer>
        {(props) => {
          const { index } = props;
          return (
            <CartItemsConsumer>
              {(props2) => {
                const {
                  quantity,
                  addItemToCart,
                  addItem,
                  reduceItem,
                  changeAttribute,
                  attrValue,
                } = props2;
                return (
                  <Fragment>
                    {this.state.product !== null && (
                      <div className="description-main">
                        <div className="description-pictures">
                          {this.state.product.gallery.map((url) => (
                            <img
                              key={url}
                              className="description-picture"
                              src={url}
                              alt="Product"
                            />
                          ))}
                        </div>
                        <img
                          className="description-image"
                          src={this.state.product.gallery[0]}
                          alt="product"
                        />
                        <article className="description-info">
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
                                      className={
                                        item.type === "text"
                                          ? attr.id ===
                                              attrValue(
                                                this.state.product.id,
                                                item.id
                                              ) ||
                                            this.state.selectedAtrributeId[
                                              i
                                            ] === attr.id
                                            ? "description-attributes-selected"
                                            : "description-attributes"
                                          : attr.id ===
                                              attrValue(
                                                this.state.product.id,
                                                item.id
                                              ) ||
                                            this.state.selectedAtrributeId[
                                              i
                                            ] === attr.id
                                          ? "description-attributes swatch-selected"
                                          : "description-attributes swatch"
                                      }
                                    >
                                      <button
                                        onClick={() => {
                                          changeAttribute(
                                            this.state.product.id,
                                            item.id,
                                            attr
                                          );
                                          this.handleAttribute(
                                            i,
                                            attr.id,
                                            attr
                                          );
                                        }}
                                        style={{ backgroundColor: attr.value }}
                                      >
                                        {item.type === "text" &&
                                          attr.value}
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
                          {quantity(this.state.product.id) < 1 ? (
                            <button
                              onClick={() => {
                                addItemToCart({
                                  id: this.state.product.id,
                                  name: this.state.product.name,
                                  prices: this.state.product.prices,
                                  imageUrl: this.state.product.gallery[0],
                                  attributes: this.state.product.attributes,
                                  value: this.state.selectedAtrribute,
                                });
                              }}
                              className="description-add"
                            >
                              ADD TO CART
                            </button>
                          ) : (
                            <div className="description-added">
                              <Reduce
                                className="description-quantity-button"
                                onClick={() =>
                                  reduceItem(this.state.product.id)
                                }
                              />
                              <h2>{quantity(this.state.product.id)}</h2>
                              <Add
                                className="description-quantity-button"
                                onClick={() => addItem(this.state.product.id)}
                              />
                            </div>
                          )}

                          <div className="description-description">
                            {parse(this.state.product.description)}
                          </div>
                        </article>
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
