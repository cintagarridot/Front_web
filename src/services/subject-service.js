import axios from 'axios';

class SubjectService {
  constructor() {
    this.service = axios.create({
      baseURL: 'https://back-web-krqc0165t.vercel.app',
      withCredentials: true, //poner siempre, es el que controla la cookie del header en una petición y es lo que lee el back para saber si tiene current user
    })
  }

  getSubjects = () => this.service.get('/subjects').then(({data}) => data);

  getSubjectById = (id) => this.service.get(`/subjects/${id}`).then(({data}) => data);

  getUserSubjects = (userId) => {
    return this.service.get("/users/" + userId + "/subjects/") 
        .then(({data}) => data)
        .catch(err => {
            console.log(err);
        })
      
  }

  deleteSubject = (id) => this.service.delete(`/subjects/${id}`).then(({data}) => data);
}

const subjectService = new SubjectService();

export default subjectService;