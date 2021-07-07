import axios from "@services/interceptor";

/** Interfaces */
import { PutPlayBody } from '@interfaces/NowPlayingBar';

const API_PLAYER = "/me/player";

class PlayerService {
  /** GET */
  static getPlayerCurrentlyPlayed = (limit: number) => {
    return axios.get(`${API_PLAYER}/recently-played?limit=${limit}`);
  };
  static getPlayerCurrentlyPlaying = () => {
    return axios.get(`${API_PLAYER}/currently-playing`);
  };

  /** PUT */
  static putPlayerPlay = (device_id: string, body: PutPlayBody | any) => {
    return axios.put(`${API_PLAYER}/play/${device_id}`, body);
  };
  static putPlayerPause = (device_id: string) => {
    return axios.put(`${API_PLAYER}/pause/${device_id}`);
  };
}

export default PlayerService;
