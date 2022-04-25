import React, { Component, Fragment } from "react";
import ProductCard from "../product-card/product-card.component";
import "./products-list.styles.scss";

import DataContext from "../../contexts/data.context";

class ProductsList extends Component {
  static contextType = DataContext;
  render() {
    const { name, products } = this.props;

    return (
      <Fragment>
        {name !== undefined && (
          <Fragment>
            <h1 className="epxksnu3">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </h1>
            <div className="products-list">
              {this.context.length === 0
                ? ""
                : products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default ProductsList;
