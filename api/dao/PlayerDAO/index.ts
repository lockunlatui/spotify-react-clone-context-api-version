import axios from "axios";

class PlayerDAO {
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
      const data = await axios.put(
        url,
        {
          uris: [spotifyUri],
          position_ms: position
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return {
        status: 400,
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
      console.log("data", error)
      return error;
    }
  }
}

export default PlayerDAO;
