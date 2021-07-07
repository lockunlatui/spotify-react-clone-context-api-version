import axios from "axios";

class AlbumDAO {
  static async getAnAlbumsTracks(token: string, id: string) {
    const url = `https://api.spotify.com/v1/albums/${id}/tracks?limit=20`;
    const data: any = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return data;
  }
}

export default AlbumDAO;
