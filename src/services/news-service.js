import axios from 'axios';

class NewsService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3800/',
      withCredentials: true, //poner siempre, es el que controla la cookie del header en una petición y es lo que lee el back para saber si tiene current user
    })
  }

    /*Peticion para traer todas las noticias */
    getNews = () => {
        this.service.get("/")
          .then(({data}) => data)
    }

    /*Peticion para traer una noticia */
    getNewsById = (id) => {
      this.service.get("/news/" + id).then(({data}) => data)
    }
  
}

const newsService = new NewsService();

export default newsService;



 