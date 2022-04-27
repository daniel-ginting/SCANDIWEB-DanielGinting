import { Routes, Route } from "react-router-dom";
import { client } from ".";
import { NAVIGATION_QUERY } from "./schema/schema";

import { Component, Fragment } from "react";
import Navigation from "./routes/navigation/navigation.component";
import Description from "./routes/description/description.component";
import Cart from "./routes/cart/cart.component";

import ProductsList from "./components/products-list/products-list.component";

class App extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }
  componentDidMount() {
    client
      .query({
        query: NAVIGATION_QUERY,
      })
      .then((result) => {
        this.setState({ categories: result.data.categories });
      });
  }
  render() {
    return (
      <Fragment>
        {this.state.categories.length && (
          <Routes>
            <Route
              path="/"
              element={<Navigation categories={this.state.categories} />}
            >
              <Route
                index
                element={
                  <ProductsList firstCategory={this.state.categories[0].name} />
                }
              />
              {this.state.categories.map((category) => (
                <Route
                  key={category.name}
                  path={category.name}
                  element={<ProductsList key={category.name} />}
                />
              ))}
              <Route path="cart" element={<Cart />} />
              <Route path=":product" element={<Description />} />
            </Route>
          </Routes>
        )}
      </Fragment>
    );
  }
}

export default App;
