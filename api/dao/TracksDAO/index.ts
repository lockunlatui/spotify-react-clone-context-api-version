import axios from "axios";

class TracksDAO {
  static async getTrackById(token: string, id: string) {
    const url = `https://api.spotify.com/v1/tracks/${id}`;
    const data: any = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        market: "VN",
      },
    });
    return data;
  }
}

export default TracksDAO;
