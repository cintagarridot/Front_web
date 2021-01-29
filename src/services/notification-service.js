import axios from 'axios';

class NotificationService {
    constructor() {
        this.service = axios.create({
            baseURL: 'https://uhu-back.herokuapp.com',
            withCredentials: true, //poner siempre, es el que controla la cookie del header en una petición y es lo que lee el back para saber si tiene current user
        })
    }

    /*Peticion para actualizar el estado de leido de una notificacion */
    markAsRead = (id) => this.service.put(`/notifications/${id}`).then(({data}) => data);

    deleteNotification = (id) => this.service.delete(`/notifications/${id}`).then(({data}) => data);

    getUnreadNotifications = () => this.service.get('/unread').then(({data}) => data);

}

const notificationService = new NotificationService();

export default notificationService;



