import axios from 'axios';

class DocumentService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3800',
      withCredentials: true,
    })
  }

  postOneDocument = (formData) => {
      

      console.log('formData', formData)
    return this.service.post(`/documents/`, formData).then(({data}) => data);
  }

  getAllDocuments = () => this.service.get(`/documents/all`).then(({data}) => data)

}

const documentService = new DocumentService();

export default documentService;