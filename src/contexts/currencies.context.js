import React, { Component } from "react";

import { gql } from "@apollo/client";
import { client } from "..";

const CurrenciesContext = React.createContext({
  currencies: [],
});

export const CurrenciesConsumer = CurrenciesContext.Consumer;

export class CurrenciesProvider extends Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      index: 0,
    };
  }
  componentDidMount() {
    client
      .query({
        query: gql`
          query {
            currencies {
              label
              symbol
            }
          }
        `,
        variables: {},
      })
      .then((result) => this.setState({ currencies: result.data.currencies }));
  }

  setIndex = (i) => {
    this.setState({ index: i });
  };

  render() {
    const { currencies, index } = this.state;
    const { setIndex } = this;
    return (
      <CurrenciesContext.Provider value={{ currencies, index, setIndex }}>
        {this.props.children}
      </CurrenciesContext.Provider>
    );
  }
}

export default CurrenciesContext;
