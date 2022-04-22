import React, { Component, Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/logo.svg";

import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import Currency from "../../components/currency/currency.component";

import DataContext from "../../contexts/data.context";

import "./navigation.styles.scss";

class Navigation extends Component {
  static contextType = DataContext;
  constructor() {
    super();
    this.state = {
      current: "",
    };
  }
  componentDidMount() {
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
        {this.context !== "" && (
          <Fragment>
            <header className="navigation">
              <ul className="categories">
                {this.context.categories.map((category) => (
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
                  this.setState({ current: this.context.categories[0].name })
                }
              >
                <Logo className="logo" />
              </Link>
              <div className="actionss">
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
