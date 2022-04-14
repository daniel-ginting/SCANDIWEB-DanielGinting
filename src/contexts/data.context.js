import React, { Component } from "react";

import { gql } from "@apollo/client";
import { client } from "..";

const DataContext = React.createContext({
  data: [],
});

export const DataConsumer = DataContext.Consumer;

export class DataProvider extends Component {
  constructor() {
    super();
    this.state = {
      data: "",
    };
  }
  componentDidMount() {
    client
      .query({
        query: gql`
          query {
            categories {
              name
              products {
                id
                inStock
                name
                gallery
                description
                brand
                attributes {
                  id
                  name
                  type
                  items {
                    id
                    displayValue
                    value
                  }
                }
                prices {
                  currency {
                    label
                    symbol
                  }
                  amount
                }
              }
            }
          }
        `,
        variables: {},
      })
      .then((result) => {
        this.setState({ data: result.data });
      });
  }

  render() {
    const { data } = this.state;
    return (
      <DataContext.Provider value={data}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

export default DataContext;
