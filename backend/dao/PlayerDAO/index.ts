import {axios} from "../interceptor";

class PlayerDAO {
  static async getPlayer() {
    const url = `/me/player`;
    const data = axios.get(url);
    return data;
  }

  static async getPlayerCurrentlyPlaying() {
    const url = `/me/player/currently-playing`;
    const data = axios.get(url);
    return data;
  }

  static async getPlayerRecentlyPlayed(limit: string | any) {
    const url = `/me/player/recently-played?limit=${limit}`;
    const data = await axios.get(url);
    return data;
  }

  static async putStartAndResume(
    deviceId: string,
    spotifyUri: string,
    position: number
  ) {
    const url = `/me/player/play?device_id=${deviceId}`;
    try {
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
      const data = await axios.put(
        url,
        isSpotifyUriPlaylist ? payloadWithContextUri : payloadWithUris
      );
      return Promise.resolve(data);
    } catch (error) {
      return {
        status: error,
      };
    }
  }

  static async putPause(deviceId: string) {
    const url = `/me/player/pause?device_id=${deviceId}`;
    try {
      const data = await axios.put(url);
      return data;
    } catch (error) {
      return error;
    }
  }

  static async getDevices() {
    const url = `/me/devices`;
    try {
      const data = await axios.get(url);
      return data;
    } catch (error) {
      return error;
    }
  }
}

export default PlayerDAO;
