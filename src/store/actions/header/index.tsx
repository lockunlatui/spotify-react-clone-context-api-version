import { AxiosResponse } from "axios";

/** Action Types */
import {
  GET_USER_FETCHING,
  GET_USER_FETCHED,
  GET_USER_ERROR,
  SET_TOKEN,
  CHANGE_LANGUAGE,
} from "@store/actionTypes/index";

/** Services */
import UserService from "@services/userService";

/** Interfaces */
import { IUser, IUserPayload } from "@interfaces/Header";

/** ================================================== */

export const getUserFetching = () => ({
  type: GET_USER_FETCHING,
});

export const getUserFetched = (payload: IUser) => ({
  type: GET_USER_FETCHED,
  payload,
});

export const getUserError = () => ({
  type: GET_USER_ERROR,
});

export const getUser = (dispatch: (arg0: IUserPayload) => void) => {
  dispatch(getUserFetching());
  UserService.getUser()
    .then((res: AxiosResponse<any>) => {
      dispatch(setToken(res.data.id));
      localStorage.setItem("user", JSON.stringify(res.data))
      dispatch(getUserFetched(res.data));
    })
    .catch((_) => {
      localStorage.setItem("user", "")
      dispatch(getUserError());
    });
};

/** ============================================================= */

export const setToken = (payload: any) => ({
  type: SET_TOKEN,
  payload,
});

/** ================================================================= */

export const changeLanguage = (payload: any) => ({
  type: CHANGE_LANGUAGE,
  payload,
});
