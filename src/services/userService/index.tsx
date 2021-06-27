import axios from "@services/interceptor";

class UserService {
  static getUser = () => {
    return axios.get(`/me`);
  };
}

export default UserService;
