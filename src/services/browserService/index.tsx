import axios from "@services/interceptor";

const API_BROWSER = "/browse";

class BrowserService {
  /** GET */
  static getAListOfNewReleases = (country: string, limit: number) => {
    return axios.get(`${API_BROWSER}/new-releases/${country}/${limit}`);
  };
}

export default BrowserService;
