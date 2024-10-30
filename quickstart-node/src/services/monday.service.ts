import { ApiClient, ChangeColumnValueOpMutation } from '@mondaydotcomorg/api';
import { NotFound } from 'http-errors';
import {
  CreateItemMutationVariables,
  GetItemsInGroupQuery,
  GetItemsInGroupQueryVariables,
  ItemWithColumnValuesFragment,
} from 'generated/graphql';
import { createItem, getItemsInGroup } from 'queries.graphql';

const UPDATED_MONDAY_API_VERSION = '2024-10';

export class MondayService {
  private constructor() {}

  static async changeColumnValue(
    token: string,
    value: any,
    itemId: string,
    boardId: string,
    columnId: string,
  ): Promise<ChangeColumnValueOpMutation> {
    const mondayApi = new ApiClient(token, UPDATED_MONDAY_API_VERSION);
    return mondayApi.operations.changeColumnValueOp({
      boardId,
      itemId,
      columnId,
      value: value,
    });
  }

  static async getLastItemInGroup(
    token: string,
    boardId: string,
    groupId: string,
  ): Promise<ItemWithColumnValuesFragment> {
    const mondayApi = new ApiClient(token, UPDATED_MONDAY_API_VERSION);
    const getItemsInGroupQueryVariables: GetItemsInGroupQueryVariables = {
      groupId,
      boardId,
    };
    const boards = await mondayApi.query<GetItemsInGroupQuery>(getItemsInGroup, getItemsInGroupQueryVariables);

    const firstItem = boards?.boards?.[0]?.groups?.[0]?.items_page?.items?.[0];

    if (firstItem) {
      return firstItem;
    }

    if (!boards?.boards?.length) {
      throw new NotFound(`Board id: ${boardId} not found`);
    }

    if (!boards.boards[0].groups?.length) {
      throw new NotFound(`Group id: ${groupId} in boardId: ${boardId} was not found`);
    }

    throw new NotFound(`There are no items in board id: ${boardId} in group id: ${groupId}`);
  }

  static async createItem(token: string, boardId: string, itemName: string): Promise<string> {
    const mondayApi = new ApiClient(token, '2024-07');
    const createItemVariables: CreateItemMutationVariables = {
      itemName,
      boardId,
    };

    return mondayApi.query(createItem, createItemVariables);
  }
}
