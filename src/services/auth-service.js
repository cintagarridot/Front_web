import axios from 'axios';

class AuthService {
  constructor() {
    this.auth = axios.create({
      baseURL: 'https://uhu-back.herokuapp.com',
      withCredentials: true,
    })
  }

  signup(user) {
    console.log('user', user)
    const {  username, firstName, lastName, password } = user;
    return this.auth.post('/auth/signup', { username, firstName, lastName, password})
      .then(({ data }) => data);
  }

  login(user) {
    const { username, password } = user;
    return this.auth.post('/auth/login', {username, password})
      .then(({ data }) => data);
  }

  logout() {
    return this.auth.post('/auth/logout')
      .then(response => response.data)
  }

  me() {
    return this.auth.get('/auth/me')
    .then(response => response.data)
  }

  changePassword = (id, password) => this.auth.put(`/auth/${id}/changePassword`, password).then(({data}) => data);

}

const authService = new AuthService();

export default authService;
