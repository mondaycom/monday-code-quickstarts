import { ApiClient, ChangeColumnValueOpMutation } from '@mondaydotcomorg/api';
import {
  CreateItemMutationVariables,
  GetItemsInGroupQuery,
  GetItemsInGroupQueryVariables,
  GetMeQuery,
  ItemWithColumnValuesFragment,
} from 'generated/graphql';
import {
  createItem as createItemQuery,
  getItemsInGroup as getItemsInGroupQuery,
  getMe as getMeQuery,
} from 'queries.graphql';
import { getValueFromExecutionContext } from '@utils/execution-context.utils';
import { NotFound } from 'http-errors';

export const UPDATED_MONDAY_API_VERSION = '2024-10';

const getMondayApiClient = (token?: string): ApiClient => {
  if (token) {
    return new ApiClient({ token, apiVersion: UPDATED_MONDAY_API_VERSION });
  } else {
    return getValueFromExecutionContext('mondayApiClient');
  }
};

const changeColumnValue = async (
  value: any,
  itemId: string,
  boardId: string,
  columnId: string,
  token?: string,
): Promise<ChangeColumnValueOpMutation> => {
  return getMondayApiClient(token).operations.changeColumnValueOp({
    boardId,
    itemId,
    columnId,
    value: value,
  });
};

const getSortedItemsByDateColumn = (
  dateColumnId: string,
  items: ItemWithColumnValuesFragment[],
): ItemWithColumnValuesFragment[] => {
  return items
    .map<{ item: ItemWithColumnValuesFragment; dateColumnValue: Date | null }>((item) => {
      try {
        const dateColumnValue = item.column_values.find((value) => value.id === dateColumnId);
        const parsedDateColumnValue = JSON.parse(dateColumnValue?.value);

        return { item, dateColumnValue: new Date(parsedDateColumnValue.date) };
      } catch {
        return { item, dateColumnValue: null };
      }
    })
    .filter(({ dateColumnValue }) => !!dateColumnValue)
    .sort((itemA, itemB) => itemB.dateColumnValue!.getTime() - itemA.dateColumnValue!.getTime())
    .map(({ item }) => item);
};

const getLastItemInGroupByDate = async (
  boardId: string,
  groupId: string,
  dateColumnId: string,
  token?: string,
): Promise<ItemWithColumnValuesFragment> => {
  const getItemsInGroupQueryVariables: GetItemsInGroupQueryVariables = {
    groupId,
    boardId,
  };
  const boards = await getMondayApiClient(token).request<GetItemsInGroupQuery>(
    getItemsInGroupQuery,
    getItemsInGroupQueryVariables,
  );

  const items = boards?.boards?.[0]?.groups?.[0]?.items_page?.items;

  if (items && items.length > 0) {
    const itemsSorted = getSortedItemsByDateColumn(dateColumnId, items);

    if (itemsSorted.length > 0) {
      return itemsSorted[0];
    } else {
      throw new NotFound(`No items with valid date value exist in the group with group id: ${groupId}`);
    }
  }

  if (!boards?.boards?.length) {
    throw new NotFound(`Board id: ${boardId} not found`);
  }

  if (!boards.boards[0].groups?.length) {
    throw new NotFound(`Group id: ${groupId} in board id: ${boardId} was not found`);
  }

  throw new NotFound(`There are no items in board id: ${boardId} in group id: ${groupId}`);
};

const createItem = async (boardId: string, itemName: string, token?: string): Promise<string> => {
  const createItemVariables: CreateItemMutationVariables = {
    itemName,
    boardId,
  };

  return getMondayApiClient(token).request(createItemQuery, createItemVariables);
};

const getMe = async (token?: string): Promise<GetMeQuery> => {
  return getMondayApiClient(token).request(getMeQuery);
};

const isItemColumnValueDifferent = (
  item: ItemWithColumnValuesFragment,
  columnId: string,
  compareMethod: (value: any) => boolean,
): boolean => {
  return !!item.column_values.find((columnValue) => {
    try {
      if (columnId === columnValue.id) {
        return compareMethod(columnValue.value);
      }
    } catch {
      return false;
    }
  });
};

export const MondayService = {
  getMondayApiClient,
  changeColumnValue,
  getLastItemInGroupByDate,
  createItem,
  getMe,
  getSortedItemsByDateColumn,
  isItemColumnValueDifferent,
};
