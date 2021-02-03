import axios from 'axios';

class PhotoService {
    constructor() {
        this.service = axios.create({
            baseURL: 'https://uhu-back.herokuapp.com',
            withCredentials: true,
        })
    }

    changeUserPhoto = (formData) => this.service.put(`/photo/`, formData).then(({data}) => data);

}

const photoService = new PhotoService();

export default photoService;
