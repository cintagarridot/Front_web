import axios from 'axios';

class DocumentService {
  constructor() {
    this.service = axios.create({
      baseURL: 'https://uhu-back.herokuapp.com',
      withCredentials: true,
    })
  }

  postOneDocument = (formData) => {


      console.log('formData', formData)
    return this.service.post(`/documents/`, formData).then(({data}) => data);
  }

  getAllDocuments = () => this.service.get(`/documents/all`).then(({data}) => data);

  deleteDocument = (id) => this.service.delete(`/documents/${id}`).then(({data}) => data);

  editDocument = (id, formData) => this.service.put(`/documents/${id}`, formData).then(({data}) => data);

}

const documentService = new DocumentService();

export default documentService;
