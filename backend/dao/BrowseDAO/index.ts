import { axios } from "../interceptor";

class BrowseDAO {
  static async getAListOfNewReleases(country: string, limit: string) {
    const url = `/browse/new-releases?country=${country}&limit=${limit}&offset=0`;
    const data = await axios.get(url);
    return data;
  }
}

export default BrowseDAO;
