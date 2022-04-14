import { Routes, Route } from "react-router-dom";

import { Component } from "react";
import Navigation from "./routes/navigation/navigation.component";
import Description from "./routes/description/description.component";
import Cart from "./routes/cart/cart.component";

import ProductsList from "./components/products-list/products-list.component";

import DataContext from "./contexts/data.context";

class App extends Component {
  static contextType = DataContext;
  render() {
    return (
      <Routes>
        <Route path="/" element={<Navigation />}>
          {this.context.length !== 0 && (
            <Route
              index
              element={
                <ProductsList
                  products={this.context.categories[0].products}
                  name={this.context.categories[0].name}
                />
              }
            />
          )}

          {this.context.length !== 0 &&
            this.context.categories.map((category) => (
              <Route
                key={category.name}
                path={category.name}
                element={
                  <ProductsList
                    products={category.products}
                    name={category.name}
                  />
                }
              />
            ))}
          <Route path=":test" element={<Description/>} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    );
  }
}

export default App;
