import { AxiosResponse } from "axios";

/** Action Types */
import {
  GET_PLAYLISTS
} from "@store/actionTypes/sideBar";

/** Services */
import PlayerService from "@services/playerService";

/** =======================GET_PLAYLISTS=========================== */

export const getPlaylistsFetching = () => ({
  type: GET_PLAYLISTS.FETCHING,
});

export const getPlaylistsFetched = (payload: any) => ({
  type: GET_PLAYLISTS.FETCHED,
  payload,
});

export const getPlaylistsError = () => ({
  type: GET_PLAYLISTS.ERROR,
});

export const getPlaylists = (dispatch: (arg0: any) => void) => {
  dispatch(getPlaylistsFetching());
  PlayerService.getPlayer()
    .then((res: AxiosResponse<any>) => {
      dispatch(getPlaylistsFetched(res.data.data));
    })
    .catch((_) => {
      dispatch(getPlaylistsError());
    });
};