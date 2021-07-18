import { createAsyncTypes } from "@utils/index";

const PREFIX = "spotify/SIDE_BAR";

export const GET_PLAYLISTS: any = createAsyncTypes(`${PREFIX}/GET_PLAYLISTS`);
