import axios from 'axios';

class UserService {
  constructor() {
    this.user = axios.create({
      baseURL: 'https://back-web.vercel.app/',
      withCredentials: false,
    })
  }

  getOneUser = (id) => {
    return this.user.get(`/users/one/${id}`).then(({data}) => data);
  }

  getUserList = () => {
    return this.user.get('/users/')
    .then(({data}) => data);
  }

  getTeachersList = () => {
    return this.user.get('/users/teachers')
      .then(({ data }) => data);
  }

  getAlumnsList = () => {
    return this.user.get('/users/alumns')
    .then(({ data }) => data);
  }

  getUserChats = (id) => this.user.get(`/users/${id}/chats`).then(({data}) => data);

  addSubjectsInUser = (user, subjects) => {
    const { _id } = user;
    const data = {
      subjects: subjects
    }
    return this.user.post(`/users/${_id}/addSubjects`, data)
    .then(({ data }) => data);
  }

  addTeacher = (firstName, lastName, username, password) => {
    this.user.post(`/users/add-teacher`, {firstName, lastName, username, password})
    .then(({data}) => data);
  }

  getDocuments = (id) => this.user.get(`/users/${id}/documents`).then(({data}) => data);

}

const userService = new UserService();

export default userService;