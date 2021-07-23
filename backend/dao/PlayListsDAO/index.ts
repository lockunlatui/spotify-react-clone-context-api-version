import { axios } from "../interceptor";

class PlayListsDAO {
  static async getPlayListsByUser(limit: number) {
    try {
      const url = `/me/playlists?limit=${limit}`;
      const data = await axios.get(url);
      return data;
    } catch (err) {
      return err;
    }
  }
}

export default PlayListsDAO;
