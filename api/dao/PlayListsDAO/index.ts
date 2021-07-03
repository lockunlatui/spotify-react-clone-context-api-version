import axios from "axios";

class PlayListsDAO {
  static async getPlayListsByUser(
    token: string,
    limit: number,
    offset: number
  ) {
    const url = `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`;
    const data: any = axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
}

export default PlayListsDAO;
