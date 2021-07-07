import { AxiosResponse } from "axios";

/** Action Types */
import {
  GET_AN_ALBUMS_TRACKS
} from "@store/actionTypes/openWebPlayer/home";

/** Services */
import AlbumService from "@services/albumService";

/** Interfaces */
import { User, UserPayload } from "@interfaces/Header";

/** ================================================== */

export const getAnAlbumsTracksFetching = () => ({
  type: GET_AN_ALBUMS_TRACKS.FETCHING,
});

export const getAnAlbumsTracksFetched = (payload: User) => ({
  type: GET_AN_ALBUMS_TRACKS.FETCHED,
  payload,
});

export const getAnAlbumsTracksError = () => ({
  type: GET_AN_ALBUMS_TRACKS.ERROR,
});

export const getUser = (dispatch: (arg0: UserPayload) => void) => {
  dispatch(getAnAlbumsTracksFetching());
  AlbumService.getAnAlbumsTracks('12')
    .then((res: AxiosResponse<any>) => {
      dispatch(getAnAlbumsTracksFetched(res.data));
    })
    .catch((_) => {
      localStorage.setItem("user", "")
      dispatch(getAnAlbumsTracksError());
    });
};