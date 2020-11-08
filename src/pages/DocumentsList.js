import React, { Component } from 'react';
import axios from 'axios';
import DataListView from 'components/DataListView';
import AuthService from 'services/auth-service';
import subjectService from 'services/subject-service';
import loading from 'assets/images/loading.jpg';
import Header from 'components/Header.js';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import documentService from 'services/document-service';
import { Link } from 'react-router-dom';
import userService from 'services/user-service';
import withAuth from 'components/withAuth';

class DocumentsList extends Component {

    state = {
        documents: {},
        status: null,
        lastChecked: null,
        selectedItems: null,
        loading: true,
        modal: false,
        selectedDocument: null,
        docName: '',
    }

    componentDidMount() {
        this.getDocuments();
    }


    toggleModal = () => {
        this.setState({
          modal: !this.state.modal
        })
    }

    clickItem = (item, event) => {
        event.preventDefault();
        this.props.onClickItem(item);
    };

    onCheckItem = (event, id) => {
        document.activeElement.blur();
    };

    getDocuments = async () => {
        const user = this.props.user;
        console.log(user)
        await userService.getDocuments(user._id).then(({documents}) =>{ 
            console.log(documents); 
            if(documents !== undefined){
                this.setState({ documents, status: 'success' })
            }
        })
    }

    saveDocument = async () => {
        const { docName, selectedDocument } = this.state;
        console.log('document', selectedDocument)

        // Create an object of formData 
        const formData = new FormData(); 
        
        // Update the formData object 
        formData.append( 
            "file0", 
            this.state.selectedFile, 
        ); 

        formData.append( 
            "title", 
            this.state.docName, 
        ); 
      
        this.toggleModal();
        return await documentService.postOneDocument(formData);
    
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    
    onFileChange = event => { 
     
        // Update the state 
        this.setState({ selectedFile: event.target.files[0] }); 
       
    }; 
    

    render() {
        const { user } = this.props;
        const { documents, status } = this.state;
        const documentList = user.documents;
        return (
            <>
            <Header/>
            <section id="content" >
                <Row className="pt-5 mt-5">
                        <Col xs='10'>
                            <h2 className="subheaderdos">Mis documentos</h2>
                        </Col>
                        <Col xs='1' className="pt-5 mt-5">
                            <Link to={'/generate-pdf'} className={'btn btn-primary'} >Generar PDF</Link>
                        </Col>
                        <Col xs='1' className="pt-5 mt-5">
                            <Button color="primary" onClick={this.toggleModal} >Subir un documento</Button>
                        </Col>
                    </Row>

                {/*documentList.length > 0 ? (
                    <div className={'text-center'}>
                        <h1>Cargando...</h1>
                    </div>
                ) : (*/
                    documentList && documentList.length > 0 ? (
                        <div>
                            {console.log('documents')}
                            {console.log(documents)}
                            {documentList.map((document, i) => {
                                return (
                                    <DataListView
                                        key={document._id}
                                        element={document}
                                        onCheckItem={this.onCheckItem}
                                    />
                                );
                            })
                            }
                        </div>
                    ) : (
                        <h2 className="text-center">No hay documentos</h2>
                    )
                

                }
              
                {this.state.modal &&
                    <div>
                        <Modal isOpen={this.state.modal} toggle={this.toggleModal} >
                        <ModalHeader>Guardar documento</ModalHeader>
                        <ModalBody>
                            <Row>
                            <Col xs={'12'}>
                                <label className={'mt-2'} htmlFor='text'>Introduzca un nombre para el documento</label>
                            </Col>
                            <Col xs={'12'}>
                                <input className={'mt-2 font'} id='text' required='true' type='text' name='docName' value={this.state.docName} onChange={this.handleChange} />
                            </Col>
                            </Row>
                            <Row>
                            <Col xs={'12'}>
                                <label className={'mt-2'} htmlFor='text'>Suba un pdf</label>
                            </Col>
                            <Col xs={'12'}>
                                <input className={'mt-2 font'} required='true' type='file' name='document' value={this.state.selectedDocument} onChange={this.onFileChange} />
                            </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.saveDocument}>Guardar</Button>{' '}
                            <Button color="secondary" onClick={this.toggleModal}>Cancelar</Button>
                        </ModalFooter>
                        </Modal>
                    </div>
                }

            </section>

            </>
        );


    }



}

export default withAuth(DocumentsList);