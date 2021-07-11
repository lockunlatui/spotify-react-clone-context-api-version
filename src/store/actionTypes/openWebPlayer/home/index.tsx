import { createAsyncTypes } from "@utils/index";

/** Album */
const PREFIX = "spotify/OPEN_WEB_PLAYER/HOME";

export const GET_AN_ALBUMS_TRACKS: any = createAsyncTypes(
  `${PREFIX}/GET_AN_ALBUMS_TRACKS`
);

export const GET_A_LIST_OF_NEW_RELEASES: any = createAsyncTypes(
  `${PREFIX}/GET_A_LIST_OF_NEW_RELEASES`
);
