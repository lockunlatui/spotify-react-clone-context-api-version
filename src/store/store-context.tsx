import { createContext } from "react";
import { IAppState } from "@interfaces/App";

import { headerReducer } from "@store/reducers/index";

export const StoreContext: any = createContext(null);

export const initialState: IAppState | any = {
  header: {
    user: {
      data: {},
      isFetching: false,
    },
    language: "en",
    token: "",
  },
};

export const reducer = (
  state: IAppState | any,
  action: { type: string; payload: any }
) => {
  const stateHeader = headerReducer(state, action);
  const rootState = () => {
    return {
      ...state,
      ...stateHeader,
    };
  };
  return rootState();
};
