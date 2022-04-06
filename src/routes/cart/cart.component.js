import React, { Component } from "react";

import "./cart.styles.scss";

class Cart extends Component {
  render() {
    return (
      <div className="cart-container">
        <h1>CART</h1>
        <div className="cart-big-item">
            <div className="cart-big-item-left">
                <h1>Apollo Running short</h1>
                <h2>$50.00</h2>
                <button>S</button>
                <button>S</button>
            </div>
            <div className="cart-big-item-right">
                <div className="cart-big-item-right-group">
                <button>+</button>
                <p>1</p>
                <button>-</button>
                </div>
                <img/>
            </div>
            
        </div>
        <div className="cart-big-item">
            <div className="cart-big-item-left">
                <h1>Apollo Running short</h1>
                <h2>$50.00</h2>
                <button>S</button>
                <button>S</button>
            </div>
            <div className="cart-big-item-right">
                <div className="cart-big-item-right-group">
                <button>+</button>
                <p>1</p>
                <button>-</button>
                </div>
                <img/>
            </div>
            
        </div>
        
      </div>
    );
  }
}

export default Cart;
