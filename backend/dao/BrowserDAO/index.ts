import {axios} from "../interceptor";

class BrowserDAO {
  static async getAListOfNewReleases(country: string, limit: number) {
    const url = `/browse/new-releases?country=${country}&limit=${limit}&offset=0`;
    const data = await axios.get(url);
    return data;
  }
}

export default BrowserDAO;
