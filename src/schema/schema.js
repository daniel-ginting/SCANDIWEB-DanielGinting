import { gql } from "@apollo/client";

export const PRODUCT_QUERY = gql`
  query ($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        amount
        currency {
          symbol
        }
      }
      brand
    }
  }
`;

export const NAVIGATION_QUERY = gql`
  query {
    categories {
      name
    }
  }
`;

export const CATEGORY_QUERY = gql`
  query ($input: CategoryInput!) {
    category(input: $input) {
      name
      products {
        id
        name
        inStock
        gallery
        prices {
          amount
          currency {
            symbol
          }
        }
      }
    }
  }
`;

export const CARD_QUERY = gql`
  query ($id: String!) {
    product(id: $id) {
      id
      name
      gallery
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        amount
        currency {
          symbol
        }
      }
    }
  }
`;
