import React, { Component } from "react";
import { ReactComponent as Dropdown } from "../../assets/dropdown.svg";

import './currency.styles.scss'

class Currency extends Component {
  render() {
    return (
      <div className="currency">
       $ <Dropdown className="dropdown-icon" />
        <div className="currency__content">
            <ul>
                <li>$ USD</li>
                <li>€ EUR</li>
                <li>$ USD</li>
            </ul>
        </div>
        
      </div>
    );
  }
}

export default Currency;
