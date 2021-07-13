import {axios} from "../interceptor";

class BrowserDAO {
  static async getAListOfNewReleases(country: string, limit: number) {
    const url = `	https://api.spotify.com/v1/browse/new-releases?country=${country}&limit=${limit}&offset=0`;
    const data: any = await axios.get(url);
    return data;
  }
}

export default BrowserDAO;
