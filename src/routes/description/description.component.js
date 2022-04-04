import { Component, Fragment } from "react";

import "./description.styles.scss";

class Description extends Component {
  render() {
    return (
      <Fragment>
        <div className="description-main">
          <div className="description-pictures">
            <div className="description-picture" />
            <div className="description-picture" />
            <div className="description-picture" />
          </div>
          <div className="description-image" />
          <article className="description-info">
            <h1>Apollo</h1>
            <h2>Running Short</h2>
            <h3>SIZE:</h3>
            <ul>
              <li>
                <button>XS</button>
              </li>
              <li>
                <button>XS</button>
              </li>
              <li>
                <button>XS</button>
              </li>
              <li>
                <button>XS</button>
              </li>
            </ul>
            <h3>PRICE:</h3>
            <h2 className="description-price">$50.00</h2>
            <button className="description-add">ADD TO CART</button>
            <p>
              Find stunning women's cocktail dresses and party dresses. Stand
              out in lace and metallic cocktail dresses and party dresses from
              all your favorite brands.
            </p>
          </article>
        </div>
      </Fragment>
    );
  }
}

export default Description;
