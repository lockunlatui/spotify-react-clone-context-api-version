import { AxiosResponse } from "axios";

/** Action Types */
import { GET_PLAYLISTS } from "@store/actionTypes/sideBar";

/** Services */
import PlaylistsService from "@services/playlistsService";

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
  return PlaylistsService.getPlaylists()
    .then((res: AxiosResponse<any>) => {
      dispatch(getPlaylistsFetched(res.data.data));
      return res.data.data;
    })
    .catch((error) => {
      dispatch(getPlaylistsError());
      return error;
    });
};
