import {axios} from "../interceptor";

class TracksDAO {
  static async getTrackById(id: string) {
    const url = `/tracks/${id}`;
    const data: any = await axios.get(url);
    return data;
  }
}

export default TracksDAO;
