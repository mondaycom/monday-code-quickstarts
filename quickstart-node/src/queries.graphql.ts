import { gql } from 'graphql-request';

export const itemWithColumnValues = gql`
  fragment ItemWithColumnValues on Item {
    id
    column_values {
      text
      type
      value
    }
  }
`;

export const getItemsInGroup = gql`
  ${itemWithColumnValues}
  query GetItemsInGroup($boardId: ID!, $groupId: String!) {
    boards(ids: [$boardId]) {
      groups(ids: [$groupId]) {
        items_page {
          items {
            ...ItemWithColumnValues
          }
        }
      }
    }
  }
`;
