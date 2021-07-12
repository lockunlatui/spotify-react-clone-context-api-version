import axios from "@services/interceptor";

/** Interfaces */
import { Apis } from "@enums/routes";

const API_PLAYER = "/me/player";

const user: any = localStorage.getItem("user") || [];

const configSpotifyApi = {
  headers: {
    Authorization: `Bearer ${JSON.parse(user)?.token}`,
  },
};

class PlayerService {
  /** GET */
  static getPlayer = () => {
    return axios.get(`${API_PLAYER}`);
  };

  static getPlayerCurrentlyPlayed = (limit: number) => {
    return axios.get(`${API_PLAYER}/recently-played?limit=${limit}`);
  };

  static getPlayerCurrentlyPlaying = () => {
    return axios.get(`${API_PLAYER}/currently-playing`);
  };

  /** PUT */
  static putPlayerPlay = (
    device_id: string,
    spotifyUri: string,
    position: number
  ) => {
    const isSpotifyUriPlaylist =
      spotifyUri.includes("playlist") ||
      spotifyUri.includes("artist") ||
      spotifyUri.includes("album");
    const payloadWithContextUri = {
      position_ms: position,
      context_uri: spotifyUri,
    };

    const payloadWithUris = {
      position_ms: position,
      uris: [spotifyUri],
    };

    return axios.put(
      `${Apis.SpotifyApi}/player/play?device_id=${device_id}`,
      isSpotifyUriPlaylist ? payloadWithContextUri : payloadWithUris,
      configSpotifyApi
    );
  };
  static putPlayerPause = (device_id: string) => {
    return axios.put(
      `${Apis.SpotifyApi}/player/pause?device_id=${device_id}`, {},
      configSpotifyApi
    );
  };
}

export default PlayerService;
