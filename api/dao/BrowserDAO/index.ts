import axios from "axios";

class BrowserDAO {
  static async getAListOfNewReleases(
    token: string,
    country: string,
    limit: number
  ) {
    const url = `	https://api.spotify.com/v1/browse/new-releases?country=${country}&limit=${limit}&offset=0`;
    const data: any = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
}

export default BrowserDAO;
