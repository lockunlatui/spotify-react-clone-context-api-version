/** Interfaces */
import { AppState } from "@interfaces/App";

/** Action Types */
import { GET_PLAYLISTS } from "@store/actionTypes/sideBar";

const sidebarReducer = (state: AppState, action: any) => {
  switch (action.type) {
    /** GET_PLAYER_CURRENTLY_PLAYED */
    case GET_PLAYLISTS.FETCHING:
      return {
        ...state,
      };
    case GET_PLAYLISTS.FETCHED:
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          playlists: {
            ...state.sidebar.playlists,
            data: action.payload,
            isFetching: false,
          },
        },
      };
    case GET_PLAYLISTS.ERROR:
      return {
        ...state,
      };
  }
};

export default sidebarReducer;
