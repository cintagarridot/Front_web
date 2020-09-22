import axios from 'axios';

class UserService {
  constructor() {
    this.user = axios.create({
      baseURL: 'http://localhost:3800',
      withCredentials: true,
    })
  }

  getTeachersList = () => {
    return this.user.get('/users/teachers')
      .then(({ data }) => data);
  }

  getAlumnsList = () => {
    return this.user.get('/users/alumns')
    .then(({ data }) => data);
  }


}

const userService = new UserService();

export default userService;