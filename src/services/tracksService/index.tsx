import axios from "@services/interceptor";

const API_TRACKS = "/tracks";

class TracksService {
  static getTrackById = (id: string) => {
    return axios.get(`${API_TRACKS}/${id}`);
  };
}

export default TracksService;
