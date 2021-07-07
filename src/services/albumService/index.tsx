import axios from "@services/interceptor";

const API_ALBUM = "v1/albums";

class AlbumService {
  /** GET */
  static getAnAlbumsTracks = (id: string) => {
    return axios.get(`${API_ALBUM}/${id}/tracks`);
  };
}

export default AlbumService;
