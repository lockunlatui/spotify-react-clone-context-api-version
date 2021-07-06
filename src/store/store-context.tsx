import { createContext } from "react";
import { AppState } from "@interfaces/App";

import { headerReducer, nowPlayingBarReducer } from "@store/reducers/index";

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
  nowPlayingBar: {
    playerCurrentlyPlayed: {
      isFetching: true,
      data: {},
    },
    playerCurrentlyPlaying: {
      isFetching: true,
      data: {},
    },
    track: {
      isFetching: true,
      data: {},
    },
  },
};

export const reducer = (
  state: AppState | any,
  action: { type: string; payload: any }
) => {
  const stateHeader = headerReducer(state, action);
  const stateNowPlayingBar = nowPlayingBarReducer(state, action);
  const rootState = () => {
    return {
      ...state,
      ...stateHeader,
      ...stateNowPlayingBar,
    };
  };
  return rootState();
};
