import axios from 'axios';

class UserService {
  static getUser = () => {
    return axios.get(`http://localhost:3000/api/v1/me`);
  };
}

export default UserService;
