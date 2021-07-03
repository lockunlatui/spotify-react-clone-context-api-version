import { createContext } from "react";
import { AppState } from "@interfaces/App";

import { headerReducer } from "@store/reducers/index";

export const StoreContext: any = createContext(null);

export const initialState: AppState | any = {
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
  state: AppState | any,
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
