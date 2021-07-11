import { AxiosResponse } from "axios";

/** Action Types */
import {
  GET_AN_ALBUMS_TRACKS,
  GET_A_LIST_OF_NEW_RELEASES,
} from "@store/actionTypes/openWebPlayer/home";

/** Services */
import AlbumService from "@services/albumService";
import BrowserService from "@services/browserService";

/** Interfaces */
import { User, UserPayload } from "@interfaces/Header";

/** =====================GET_AN_ALBUMS_TRACKS============================= */

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
  AlbumService.getAnAlbumsTracks("12")
    .then((res: AxiosResponse<any>) => {
      dispatch(getAnAlbumsTracksFetched(res.data));
    })
    .catch((_) => {
      localStorage.setItem("user", "");
      dispatch(getAnAlbumsTracksError());
    });
};

/** =======================GET_A_LIST_OF_NEW_RELEASES=========================== */

export const getAListOfNewReleasesFetching = () => ({
  type: GET_A_LIST_OF_NEW_RELEASES.FETCHING,
});

export const getAListOfNewReleasesFetched = (payload: any) => ({
  type: GET_A_LIST_OF_NEW_RELEASES.FETCHED,
  payload,
});

export const getAListOfNewReleasesError = () => ({
  type: GET_A_LIST_OF_NEW_RELEASES.ERROR,
});

export const getAListOfNewReleases = (dispatch: (arg0: any) => void) => {
  dispatch(getAListOfNewReleasesFetching());
  BrowserService.getAListOfNewReleases("VN", 20)
    .then((res: AxiosResponse<any>) => {
      dispatch(getAListOfNewReleasesFetched(res.data?.data));
    })
    .catch((_) => {
      dispatch(getAListOfNewReleasesError());
    });
};
