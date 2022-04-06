import React, { Component } from "react";
import ProductCard from "../product-card/product-card.component";
import "./products-list.styles.scss";

class ProductsList extends Component {
  render() {
    const products = [
      {
        id: 1,
        title: "Apollo Running Short",
        price: "$50.00",
      },
      {
        id: 2,
        title: "Apollo Running Short",
        price: "$50.00",
      },
      {
        id: 3,
        title: "Apollo Running Short",
        price: "$50.00",
      },
      {
        id: 4,
        title: "Apollo Running Short",
        price: "$50.00",
      },
      {
        id: 5,
        title: "Apollo Running Short",
        price: "$50.00",
      },
      {
        id: 6,
        title: "Apollo Running Short",
        price: "$50.00",
      },
    ];
    return (
      <div className="products-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }
}

export default ProductsList;
