import axios from 'axios';

class ChatService {
  constructor() {
    this.service = axios.create({
      baseURL: 'https://back-web-krqc0165t.vercel.app',
      withCredentials: true, //poner siempre, es el que controla la cookie del header en una petición y es lo que lee el back para saber si tiene current user
    })
  }

  createChat = (idUser) => this.service.post('/', { idUser });

  getChatsByUser = () => this.service.get('/').then(({data}) => data);

  getChat = (id) => this.service.get(`/${id}`).then(({data}) => data)

  getMessages = () => this.service.get('/id/messages').then(({data}) => data)

  getOtherUser = (id) => this.service.get(`/${id}/otherUser`).then(({data}) => data);

  postMessage = (message, chatId) => {
    this.service.post('/addMessage', {message, chatId}).then(({data}) => data)
   }

}

const chatService = new ChatService();

export default chatService;