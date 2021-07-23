import axios from "@services/interceptor";

const API_PLAYLISTS = "me/playlists";

class PlaylistsService {
  /** GET */
  static getPlaylists = () => {
    return axios.get(`${API_PLAYLISTS}`);
  };
}

export default PlaylistsService;
