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

  static async getPlayerRecentlyPlayed(
    token: string,
    limit: number,
    after: string,
    before: string
  ) {
    console.log("after", after)
    console.log("limit", limit)
    console.log("before", before)
    const url = `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`;
    const data = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
}

export default PlayerDAO;
