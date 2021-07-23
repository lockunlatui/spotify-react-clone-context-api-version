/** Interfaces */
import { AppState } from "@interfaces/App";

/** Action Types */
import { GET_A_LIST_OF_NEW_RELEASES } from "@store/actionTypes/openWebPlayer/home";

const openWebPlayerHomeReducer = (state: AppState, action: any) => {
  switch (action.type) {
    /** GET_PLAYER_CURRENTLY_PLAYED */
    case GET_A_LIST_OF_NEW_RELEASES.FETCHING:
      return {
        ...state,
      };
    case GET_A_LIST_OF_NEW_RELEASES.FETCHED:
      return {
        ...state,
        openWebPlayer: {
          ...state.openWebPlayer,
          home: {
            ...state.openWebPlayer.home,
            listOfNewRelease: {
              ...state.openWebPlayer.home.listOfNewRelease,
              data: action.payload,
              isFetching: false,
            },
          },
        },
      };
    case GET_A_LIST_OF_NEW_RELEASES.ERROR:
      return {
        ...state,
      };
  }
};

export default openWebPlayerHomeReducer;
