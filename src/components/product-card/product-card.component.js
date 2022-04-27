import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Cart } from "../../assets/white-cart.svg";
import { ReactComponent as Add } from "../../assets/card-add.svg";
import { ReactComponent as Reduce } from "../../assets/card-reduce.svg";

import CartItemsContext from "../../contexts/cart-items.context";
import { CurrenciesConsumer } from "../../contexts/currencies.context";

import "./product-card.styles.scss";
import { client } from "../..";
import { CARD_QUERY } from "../../schema/schema";

class ProductCard extends Component {
  static contextType = CartItemsContext;
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  toggleButton = (number) => {
    if (number < 2) {
      this.setState({ added: false });
    }
  };

  componentDidMount() {
    this.setState({ added: this.context.quantity > 0 ? true : false });
  }

  render() {
    const { id, name, gallery, prices, inStock } = this.props.product;
    const { addItem, reduceItem, quantity, addItemToCart } = this.context;
    const handleCartClick = () => {
      client
        .query({
          query: CARD_QUERY,
          variables: { id },
        })
        .then((result) => {
          return result.data.product;
        })
        .then((data) =>
          addItemToCart({
            id: data.id,
            name: data.name,
            prices: data.prices,
            gallery: data.gallery,
            attributes: data.attributes,
            value: data.attributes[0],
          })
        );
    };
    return (
      <CurrenciesConsumer>
        {(props) => {
          const { index } = props;
          return (
            <Fragment>
              {inStock ? (
                <div
                  onMouseEnter={() => this.setState({ open: true })}
                  onMouseLeave={() => this.setState({ open: false })}
                  className="product-card"
                >
                  {this.state.open ? (
                    quantity(id) >= 1 ? (
                      <Fragment>
                        <Add className="card-add" onClick={() => addItem(id)} />
                        <div className="product-quantity">{quantity(id)}</div>
                        <Reduce
                          className="card-reduce"
                          onClick={() => {
                            this.toggleButton(quantity(id));
                            reduceItem(id);
                          }}
                        />
                      </Fragment>
                    ) : (
                      <button
                        className="product-circle"
                        onClick={handleCartClick}
                      >
                        <Cart className="product-cart" />
                      </button>
                    )
                  ) : null}
                  <Link to={`/${id}`}>
                    <img
                      src={`${gallery[0]}`}
                      className="product-image"
                      alt="product"
                    />

                    <div className="product-text">
                      <h2>{name}</h2>
                      <p>{`${prices[index].currency.symbol} ${prices[index].amount}`}</p>
                    </div>
                  </Link>
                </div>
              ) : (
                <Link to={`/${id}`} className="product-card-disabled">
                  <img
                    src={`${gallery[0]}`}
                    className="product-image"
                    alt="product"
                  />
                  <h2 className="out-of-stock">OUT OF STOCK</h2>
                  <div className="product-text">
                    <h2>{name}</h2>
                    <p>{`${prices[index].currency.symbol} ${prices[index].amount}`}</p>
                  </div>
                </Link>
              )}
            </Fragment>
          );
        }}
      </CurrenciesConsumer>
    );
  }
}

export default ProductCard;
