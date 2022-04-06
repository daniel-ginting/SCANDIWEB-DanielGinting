import React, { Component, Fragment } from "react";
import ProductsList from "../../components/products-list/products-list.component";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <h1 style={{marginTop: '80px', marginLeft: '100px', fontFamily: 'Raleway', fontWeight: '400', fontSize: '42px', marginBottom: '50px'}}>All</h1>
    <ProductsList />
    </Fragment>
    );
  }
}

export default Home;
