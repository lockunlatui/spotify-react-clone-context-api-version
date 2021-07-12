import axios from "axios";

class PlayerDAO {
  static async getPlayer(token: string) {
    const url = `https://api.spotify.com/v1/me/player`;
    const data = axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        market: "VN",
      },
    });
    return data;
  }


  static async getPlayerCurrentlyPlaying(token: string) {
    const url = `https://api.spotify.com/v1/me/player/currently-playing`;
    const data = axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        market: "VN",
      },
    });
    return data;
  }

  static async getPlayerRecentlyPlayed(token: string, limit: number) {
    const url = `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`;
    const data = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }

  static async putStartAndResume(
    token: string,
    deviceId: string,
    spotifyUri: string,
    position: number
  ) {
    const url = `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`;
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
        isSpotifyUriPlaylist ? payloadWithContextUri : payloadWithUris,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return Promise.resolve(data);
    } catch (error) {
      return {
        status: error,
      };
    }
  }

  static async putPause(token: string, deviceId: string) {
    const url = `https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`;
    try {
      const data = await axios.put(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      console.log("data", error);
      return error;
    }
  }
}

export default PlayerDAO;
