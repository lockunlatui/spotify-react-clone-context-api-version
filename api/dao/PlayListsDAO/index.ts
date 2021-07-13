import {axios} from "../interceptor";

class PlayListsDAO {
  static async getPlayListsByUser(limit: number) {
    const url = `/me/playlists?limit=${limit}`;
    const data = await axios.get(url);
    console.log("LOC DO", axios)
    return data;
  }
}

export default PlayListsDAO;
