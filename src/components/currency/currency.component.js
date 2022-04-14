import React, { Component, Fragment } from "react";
import { ReactComponent as Dropdown } from "../../assets/dropdown.svg";

import CurrenciesContext from "../../contexts/currencies.context";

import "./currency.styles.scss";

class Currency extends Component {
  static contextType = CurrenciesContext;
  render() {
    const { currencies, index, setIndex } = this.context;
    return (
      <div className="currency">
        {currencies.length !== 0 && (
          <Fragment>
            {currencies[index].symbol}
            <Dropdown className="dropdown-icon" />
            <div className="currency__content">
              <ul>
                {currencies.length === 0
                  ? ""
                  : currencies.map((currency, i) => (
                      <li
                        key={currency.label}
                        onClick={() => setIndex(i)}
                      >{`${currency.symbol} ${currency.label}`}</li>
                    ))}
              </ul>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default Currency;
