import { gql } from 'graphql-request';

export const itemWithColumnValues = gql`
  fragment ItemWithColumnValues on Item {
    id
    column_values {
      id
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

export const createItem = gql`
  mutation CreateItem($boardId: ID!, $itemName: String!) {
    create_item(board_id: $boardId, item_name: $itemName) {
      id
    }
  }
`;

export const getMe = gql`
  query GetMe {
    me {
      id
    }
  }
`;
