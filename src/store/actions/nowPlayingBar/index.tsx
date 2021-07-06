import { AxiosResponse } from "axios";

/** Action Types */
import {
  GET_PLAYER_CURRENTLY_PLAYED,
  GET_PLAYER_CURRENTLY_PLAYING,
  GET_TRACK_BY_ID,
} from "@store/actionTypes/nowPlayingBar";

/** Services */
import PlayerService from "@services/playerService";
import TracksService from "@services/tracksService";

/** ================================================== */

export const getPlayerCurrentlyPlayedFetching = () => ({
  type: GET_PLAYER_CURRENTLY_PLAYED.FETCHING,
});

export const getPlayerCurrentlyPlayedFetched = (payload: any) => ({
  type: GET_PLAYER_CURRENTLY_PLAYED.FETCHED,
  payload,
});

export const getPlayerCurrentlyPlayedError = () => ({
  type: GET_PLAYER_CURRENTLY_PLAYED.ERROR,
});

export const getPlayerCurrentlyPlayed = (dispatch: (arg0: any) => void) => {
  dispatch(getPlayerCurrentlyPlayedFetching());
  PlayerService.getPlayerCurrentlyPlayed(1)
    .then((res: AxiosResponse<any>) => {
      dispatch(getPlayerCurrentlyPlayedFetched(res.data.data));
    })
    .catch((_) => {
      dispatch(getPlayerCurrentlyPlayedError());
    });
};

/** ================================================== */

export const getPlayerCurrentlyPlayingFetching = () => ({
  type: GET_PLAYER_CURRENTLY_PLAYING.FETCHING,
});

export const getPlayerCurrentlyPlayingFetched = (payload: any) => ({
  type: GET_PLAYER_CURRENTLY_PLAYING.FETCHED,
  payload,
});

export const getPlayerCurrentlyPlayingError = () => ({
  type: GET_PLAYER_CURRENTLY_PLAYING.ERROR,
});

export const getPlayerCurrentlyPlaying = (dispatch: (arg0: any) => void) => {
  dispatch(getPlayerCurrentlyPlayedFetching());
  PlayerService.getPlayerCurrentlyPlaying()
    .then((res: AxiosResponse<any>) => {
      if (Boolean(res.data.data?.is_playing)) {
        getTrackByIdPlaying(dispatch, res.data.data?.item.id);
      } else {
        getPlayerCurrentlyPlayed(dispatch);
      }
      dispatch(getPlayerCurrentlyPlayingFetched(res.data.data));
    })
    .catch((_) => {
      dispatch(getPlayerCurrentlyPlayedError());
    });
};

/** ================================================== */

export const getTrackByIdFetching = () => ({
  type: GET_TRACK_BY_ID.FETCHING,
});

export const getTrackByIdFetched = (payload: any) => ({
  type: GET_TRACK_BY_ID.FETCHED,
  payload,
});

export const getTrackByIdError = () => ({
  type: GET_TRACK_BY_ID.ERROR,
});

export const getTrackByIdPlaying = (
  dispatch: (arg0: any) => void,
  id: string
) => {
  dispatch(getTrackByIdFetching());
  TracksService.getTrackById(id)
    .then((res: AxiosResponse<any>) => {
      dispatch(getTrackByIdFetched(res.data.data));
    })
    .catch((_) => {
      dispatch(getTrackByIdError());
    });
};
