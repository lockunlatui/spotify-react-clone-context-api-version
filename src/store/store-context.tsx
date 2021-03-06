import { createContext } from "react";

/** Interfaces */
import { AppState } from "@interfaces/App";

/** Enums */
import { Languages } from "@enums/languages";

/** Reducers */
import {
  headerReducer,
  nowPlayingBarReducer,
  openWebPlayerHomeReducer,
  sidebarReducer,
} from "@store/reducers/index";

export const StoreContext: any = createContext(null);

export const initialState: AppState | any = {
  header: {
    user: {
      data: {},
      isFetching: false,
    },
    language: Languages.English,
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
    play: {
      isFetching: true,
      data: {},
    },
  },
  openWebPlayer: {
    home: {
      listOfNewRelease: {
        isFetching: true,
        data: {},
      },
    },
  },
  sidebar: {
    playlists: {
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
  const stateOpenWebPlayerHome = openWebPlayerHomeReducer(state, action);
  const stateSidebar = sidebarReducer(state, action);
  const rootState = () => {
    return {
      ...state,
      ...stateHeader,
      ...stateNowPlayingBar,
      ...stateOpenWebPlayerHome,
      ...stateSidebar,
    };
  };
  return rootState();
};
