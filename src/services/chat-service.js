import axios from 'axios';

class ChatService {
  constructor() {
    this.service = axios.create({
      baseURL: 'https://uhu-back.herokuapp.com/chat',
      withCredentials: false,
    })
  }

  createChat = (idUser) => this.service.post('/', { idUser });

  getChatsByUser = () => this.service.get('/').then(({data}) => data);

  getChat = (id) => this.service.get(`/${id}`).then(({data}) => data)

  getMessages = () => this.service.get('/id/messages').then(({data}) => data)

  getOtherUser = (id) => this.service.get(`/${id}/otherUser`).then(({data}) => data);

  postMessage = (message, chatId) => {
    console.log('chatID  en chat service', chatId);
    this.service.post('/addMessage', {message, chatId}).then(({data}) => data)
   }

}

const chatService = new ChatService();

export default chatService;
