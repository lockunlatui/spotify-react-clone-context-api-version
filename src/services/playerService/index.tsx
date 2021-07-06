import axios from "@services/interceptor";

const API_PLAYER = "/me/player";

class PlayerService {
  static getPlayerCurrentlyPlayed = (limit: number) => {
    return axios.get(`${API_PLAYER}/recently-played?limit=${limit}`);
  };
  static getPlayerCurrentlyPlaying = () => {
    return axios.get(`${API_PLAYER}/currently-playing`);
  };
}

export default PlayerService;
