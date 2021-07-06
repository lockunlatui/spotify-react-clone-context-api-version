import { StatusFetching } from "@enums/index";

const AsyncActionCreatorSuffix = {
  INIT: StatusFetching.Init,
  FETCHING: StatusFetching.Fetching,
  FETCHED: StatusFetching.Fetched,
  ERROR: StatusFetching.Error,
};

export const createActionTypes = (creatorSuffix: any) => (type: string) => {
  return Object.values(creatorSuffix).reduce((acc: any, cur: any) => {
    acc[cur] = `${type}_${cur}`;
    return acc;
  }, {});
};

export const createAsyncTypes = createActionTypes(AsyncActionCreatorSuffix);
