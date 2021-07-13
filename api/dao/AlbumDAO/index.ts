import {axios} from "../interceptor";

class AlbumDAO {
  static async getAnAlbumsTracks(id: string) {
    const url = `https://api.spotify.com/v1/albums/${id}/tracks?limit=20`;
    const data: any = await axios.get(url);
    return data;
  }
}

export default AlbumDAO;
