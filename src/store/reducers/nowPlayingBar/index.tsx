/** Interfaces */
import { AppState } from "@interfaces/App";

/** Action Types */
import {
  GET_PLAYER_CURRENTLY_PLAYED,
  GET_PLAYER_CURRENTLY_PLAYING,
  GET_TRACK_BY_ID,
  PUT_PLAY,
} from "@store/actionTypes/nowPlayingBar";

const nowPlayingBarReducer = (state: AppState, action: any) => {
  switch (action.type) {
    /** GET_PLAYER_CURRENTLY_PLAYED */
    case GET_PLAYER_CURRENTLY_PLAYED.FETCHING:
      return {
        ...state,
        nowPlayingBar: {
          ...state.nowPlayingBar,
          playerCurrentlyPlayed: {
            ...state.nowPlayingBar.playerCurrentlyPlayed,
            isFetching: true,
          },
        },
      };
    case GET_PLAYER_CURRENTLY_PLAYED.FETCHED:
      return {
        ...state,
        nowPlayingBar: {
          ...state.nowPlayingBar,
          playerCurrentlyPlayed: {
            ...state.nowPlayingBar.playerCurrentlyPlayed,
            isFetching: false,
            data: action.payload,
          },
        },
      };
    case GET_PLAYER_CURRENTLY_PLAYED.ERROR:
      return {
        ...state,
        nowPlayingBar: {
          ...state.nowPlayingBar,
          playerCurrentlyPlayed: {
            ...state.nowPlayingBar.playerCurrentlyPlayed,
            isFetching: false,
            data: {},
          },
        },
      };

    /** GET_PLAYER_CURRENTLY_PLAYING */
    case GET_PLAYER_CURRENTLY_PLAYING.FETCHING:
      return {
        ...state,
        nowPlayingBar: {
          ...state.nowPlayingBar,
          playerCurrentlyPlaying: {
            ...state.nowPlayingBar.playerCurrentlyPlaying,
            isFetching: true,
          },
        },
      };
    case GET_PLAYER_CURRENTLY_PLAYING.FETCHED:
      return {
        ...state,
        nowPlayingBar: {
          ...state.nowPlayingBar,
          playerCurrentlyPlaying: {
            ...state.nowPlayingBar.playerCurrentlyPlaying,
            isFetching: false,
            data: action.payload,
          },
        },
      };
    case GET_PLAYER_CURRENTLY_PLAYING.ERROR:
      return {
        ...state,
        nowPlayingBar: {
          ...state.nowPlayingBar,
          playerCurrentlyPlaying: {
            ...state.nowPlayingBar.playerCurrentlyPlaying,
            isFetching: false,
            data: {},
          },
        },
      };

    /** GET_TRACK_BY_ID */
    case GET_TRACK_BY_ID.FETCHING:
      return {
        ...state,
        nowPlayingBar: {
          ...state.nowPlayingBar,
          track: {
            ...state.nowPlayingBar.track,
            isFetching: true,
          },
        },
      };
    case GET_TRACK_BY_ID.FETCHED:
      return {
        ...state,
        nowPlayingBar: {
          ...state.nowPlayingBar,
          track: {
            ...state.nowPlayingBar.track,
            isFetching: false,
            data: action.payload,
          },
        },
      };
    case GET_TRACK_BY_ID.ERROR:
      return {
        ...state,
        nowPlayingBar: {
          ...state.nowPlayingBar,
          track: {
            ...state.nowPlayingBar.track,
            isFetching: false,
            data: {},
          },
        },
      };

    /** PUT_PLAY */
    case PUT_PLAY.FETCHING:
      return {
        ...state,
        nowPlayingBar: {
          ...state.nowPlayingBar,
          play: {
            ...state.nowPlayingBar.play,
            isFetching: true,
          },
        },
      };
    case PUT_PLAY.FETCHED:
      return {
        ...state,
        nowPlayingBar: {
          ...state.nowPlayingBar,
          play: {
            ...state.nowPlayingBar.play,
            isFetching: false,
          },
        },
      };
    case PUT_PLAY.ERROR:
      return {
        ...state,
        nowPlayingBar: {
          ...state.nowPlayingBar,
          play: {
            ...state.nowPlayingBar.play,
            isFetching: false,
          },
        },
      };
  }
};

export default nowPlayingBarReducer;
