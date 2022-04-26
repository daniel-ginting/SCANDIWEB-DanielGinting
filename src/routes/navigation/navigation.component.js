import React, { Component, Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { client } from "../..";

import { NAVIGATION_QUERY } from "../../queries/queries";

import { ReactComponent as Logo } from "../../assets/logo.svg";

import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import Currency from "../../components/currency/currency.component";

import "./navigation.styles.scss";

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      current: "",
    };
  }
  componentDidMount() {
    client
      .query({
        query: NAVIGATION_QUERY,
      })
      .then((result) => this.setState({ categories: result.data.categories }));
    let arr = window.location.pathname.split("");
    arr.shift();
    let str = arr.join("");
    if (str === "") {
      this.setState({ current: "all" });
    } else {
      this.setState({ current: str });
    }
  }
  render() {
    return (
      <Fragment>
        {this.state.categories.length && (
          <Fragment>
            <header className="navigation">
              <ul className="categories">
                {this.state.categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      className={
                        category.name === this.state.current
                          ? "category-active"
                          : "category"
                      }
                      onClick={() => this.setState({ current: category.name })}
                      to={`/${category.name}`}
                    >
                      {category.name.toUpperCase()}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to="/"
                onClick={() =>
                  this.setState({ current: this.state.categories[0].name })
                }
              >
                <Logo className="logo" />
              </Link>
              <div className="actions">
                <div className="actions-wrapper">
                  <Currency />
                  <CartDropdown className="cart-icon" />
                </div>
              </div>
            </header>
            <Outlet />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default Navigation;
