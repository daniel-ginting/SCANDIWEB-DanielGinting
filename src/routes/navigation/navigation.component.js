import React, { Component, Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Cart } from "../../assets/cart.svg";
import { ReactComponent as Dropdown } from "../../assets/dropdown.svg";

import "./navigation.styles.scss";

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      active: "women",
    };
  }
  render() {
    const { active } = this.state;
    return (
      <Fragment>
        <header className="navigation">
          <ul className="categories">
            <li>
              <Link
                className={active === "women" ? "category-active" : "category"}
                onClick={() => this.setState({ active: "women" })}
                to="/women"
              >
                WOMEN
              </Link>
            </li>
            <li>
              <Link
                className={active === "men" ? "category-active" : "category"}
                onClick={() => this.setState({ active: "men" })}
                to="/men"
              >
                MEN
              </Link>
            </li>
            <li>
              <Link
                className={active === "kids" ? "category-active" : "category"}
                onClick={() => this.setState({ active: "kids" })}
                to="/kids"
              >
                KIDS
              </Link>
            </li>
          </ul>
          <Link to="/">
            <Logo className="logo" />
          </Link>
          <div className="actions">
            <div className="actions-wrapper">
              <div className="currency">
                $
                <Dropdown className="dropdown" />
              </div>
              <Cart className="cart" />
            </div>
          </div>
        </header>
        <Outlet />
      </Fragment>
    );
  }
}

export default Navigation;
