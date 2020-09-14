import axios from 'axios';

class ChatService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3800/chat',
      withCredentials: true, //poner siempre, es el que controla la cookie del header en una petición y es lo que lee el back para saber si tiene current user
    })
  }

  createChat = (idUser) => this.service.post('/', { idUser });

  getChatsByUser = () => this.service.get('/').then(({data}) => { console.log(data); return data;});

  postMessage = (message, chatId) => {
    this.service.post('/addMessage', {message, chatId}).then(({data}) => data)
   }
}

const chatService = new ChatService();

export default chatService;