/** Interfaces */
import { AppState } from "@interfaces/App";
import { UserPayload } from "@interfaces/Header";

/** Action Types */
import {
  GET_USER_FETCHING,
  GET_USER_FETCHED,
  GET_USER_ERROR,
  SET_TOKEN,
  CHANGE_LANGUAGE,
} from "@store/actionTypes/header";

const headerReducer = (state: AppState, action: UserPayload) => {
  switch (action.type) {
    case GET_USER_FETCHING:
      return {
        ...state,
        header: {
          ...state.header,
          user: {
            ...state.header.user,
            isFetching: true,
          },
        },
      };
    case GET_USER_FETCHED:
      return {
        ...state,
        header: {
          ...state.header,
          user: {
            ...state.header.user,
            isFetching: false,
            data: action.payload,
          },
        },
      };
    case GET_USER_ERROR:
      return {
        ...state,
        header: {
          ...state.header,
          user: {
            ...state.header.user,
            isFetching: false,
            data: {},
          },
        },
      };
    case SET_TOKEN:
      return {
        ...state,
        header: {
          ...state.header,
          token: action.payload,
        },
      };
    case CHANGE_LANGUAGE:
      return {
        ...state,
        header: {
          ...state.header,
          language: action.payload,
        },
      };
    default:
      return state;
  }
};

export default headerReducer;
