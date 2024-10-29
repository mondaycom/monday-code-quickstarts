import { ApiClient, ChangeColumnValueOpMutation } from '@mondaydotcomorg/api';
import { NotFound } from 'http-errors';
import { GetItemsInGroupQuery, GetItemsInGroupQueryVariables, ItemWithColumnValuesFragment } from 'generated/graphql';
import { getItemsInGroup } from 'queries.graphql';

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

    if (boards?.boards?.length > 0) {
      if (boards.boards[0].groups?.length > 0) {
        if (boards.boards[0].groups[0].items_page?.items.length > 0) {
          return boards.boards[0].groups[0].items_page?.items[0];
        } else {
          throw NotFound(`There are no items in board id: ${boardId} in group id: ${groupId}`);
        }
      } else {
        throw NotFound(`Group id: ${groupId} in boardId: ${boardId} was not found`);
      }
    } else {
      throw NotFound(`Board id: ${boardId} not found`);
    }
  }
}
