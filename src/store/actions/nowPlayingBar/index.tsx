import { AxiosResponse } from "axios";

/** Action Types */
import {
  GET_PLAYER_CURRENTLY_PLAYED,
  GET_PLAYER_CURRENTLY_PLAYING,
  GET_TRACK_BY_ID,
  PUT_PLAY,
  PUT_PAUSE,
  GET_PLAYER,
} from "@store/actionTypes/nowPlayingBar";

/** Services */
import PlayerService from "@services/playerService";
import TracksService from "@services/tracksService";

let intervalPlay: any; 

/** =======================GET_PLAYER=========================== */

export const getPlayerFetching = () => ({
  type: GET_PLAYER.FETCHING,
});

export const getPlayerFetched = (payload: any) => ({
  type: GET_PLAYER.FETCHED,
  payload,
});

export const getPlayerError = () => ({
  type: GET_PLAYER.ERROR,
});

export const getPlayer = (dispatch: (arg0: any) => void) => {
  dispatch(getPlayerFetching());
  PlayerService.getPlayer()
    .then((res: AxiosResponse<any>) => {
      clearInterval(intervalPlay);
      dispatch(getPlayerFetched(res.data.data));
    })
    .catch((_) => {
      clearInterval(intervalPlay);
      dispatch(getPlayerError());
    });
};

/** =======================GET_PLAYER_CURRENTLY_PLAYED=========================== */

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
  PlayerService.getPlayerCurrentlyPlayed(50)
    .then((res: AxiosResponse<any>) => {
      dispatch(getPlayerCurrentlyPlayedFetched(res.data.data));
    })
    .catch((_) => {
      dispatch(getPlayerCurrentlyPlayedError());
    });
};

/** ======================GET_PLAYER_CURRENTLY_PLAYING============================ */

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

/** ======================GET_TRACK_BY_ID============================ */

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

/** ======================PUT_PLAY============================ */

export const putPlayFetching = () => ({
  type: PUT_PLAY.FETCHING,
});

export const putPlayFetched = () => ({
  type: PUT_PLAY.FETCHED,
});

export const putPlayError = () => ({
  type: PUT_PLAY.ERROR,
});

export const putPlay = (
  dispatch: (arg0: any) => void,
  deviceId: string,
  uri: string,
  position: number,
  token: string
) => {
  dispatch(putPlayFetching());
  PlayerService.putPlayerPlay(deviceId, uri, position, token)
    .then((res: AxiosResponse<any>) => {
      intervalPlay = setInterval(() => {
       getPlayerCurrentlyPlaying(dispatch);
     }, 500);
    })
    .catch((_) => {
      dispatch(putPlayError());
    });
};

/** ======================PUT_PAUSE============================ */

export const putPauseFetching = () => ({
  type: PUT_PAUSE.FETCHING,
});

export const putPauseFetched = () => ({
  type: PUT_PAUSE.FETCHED,
});

export const putPauseError = () => ({
  type: PUT_PAUSE.ERROR,
});

export const putPause = (
  dispatch: (arg0: any) => void,
  deviceId: string | any,
  token: string
) => {
  dispatch(putPauseFetching());
  PlayerService.putPlayerPause(deviceId, token)
    .then((res: AxiosResponse<any>) => {
      getPlayerCurrentlyPlaying(dispatch);
    })
    .catch((_) => {
      dispatch(putPauseError());
    });
};
