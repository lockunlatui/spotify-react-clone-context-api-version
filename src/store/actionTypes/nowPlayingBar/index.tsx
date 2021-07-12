import { createAsyncTypes } from "@utils/index";

/** Player */
const PREFIX = "spotify/NOW_PLAY_BAR";

export const GET_PLAYER: any = createAsyncTypes(`${PREFIX}/GET_PLAYER`);

export const GET_PLAYER_CURRENTLY_PLAYED: any = createAsyncTypes(
  `${PREFIX}/GET_PLAYER_CURRENTLY_PLAYED`
);

export const GET_PLAYER_CURRENTLY_PLAYING: any = createAsyncTypes(
  `${PREFIX}/GET_PLAYER_CURRENTLY_PLAYING`
);

export const GET_TRACK_BY_ID: any = createAsyncTypes(
  `${PREFIX}/GET_TRACK_BY_ID`
);

export const PUT_PLAY: any = createAsyncTypes(`${PREFIX}/PUT_PLAY`);

export const PUT_PAUSE: any = createAsyncTypes(`${PREFIX}/PUT_PAUSE`);
