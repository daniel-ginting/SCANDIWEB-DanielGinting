import React, { Component, Fragment } from "react";
import { ReactComponent as Dropdown } from "../../assets/dropdown.svg";

import CurrenciesContext from "../../contexts/currencies.context";

import "./currency.styles.scss";

class Currency extends Component {
  static contextType = CurrenciesContext;
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { currencies, index, setIndex } = this.context;
    return (
      <div
        className="currency"
        onBlur={() => {
          this.setState({ open: false });
        }}
        tabIndex="0"
      >
        {currencies.length !== 0 && (
          <Fragment>
            <div
              onClick={() => {
                this.setState({ open: !this.state.open });
              }}
            >
              {currencies[index].symbol}
              <Dropdown className="dropdown-icon" />
            </div>
            {this.state.open ? (
              <div className="currency__content">
                <ul>
                  {currencies.length === 0
                    ? ""
                    : currencies.map((currency, i) => (
                        <li
                          key={currency.label}
                          onClick={() => {
                            setIndex(i);
                            this.setState({ open: false });
                          }}
                        >{`${currency.symbol} ${currency.label}`}</li>
                      ))}
                </ul>
              </div>
            ) : null}
          </Fragment>
        )}
      </div>
    );
  }
}

export default Currency;
