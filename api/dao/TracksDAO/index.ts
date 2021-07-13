import {axios} from "../interceptor";

class TracksDAO {
  static async getTrackById(id: string) {
    const url = `https://api.spotify.com/v1/tracks/${id}`;
    const data: any = await axios.get(url);
    return data;
  }
}

export default TracksDAO;
