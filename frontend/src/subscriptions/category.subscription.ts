import { gql } from '@apollo/client';

export const CATEGORY_ADDED_SUBSCRIPTION = gql`
  subscription {
    categoryAdded {
      id
      name
    }
  }
`;

