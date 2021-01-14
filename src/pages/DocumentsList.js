import React, { Component } from 'react';
import axios from 'axios';
import DataListView from 'components/DataListView';
import AuthService from 'services/auth-service';
import subjectService from 'services/subject-service';
import loading from 'assets/images/loading.jpg';
import Header from 'components/Header.js';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Dropdown,
    DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import documentService from 'services/document-service';
import { Link } from 'react-router-dom';
import userService from 'services/user-service';
import withAuth from 'components/withAuth';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";


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
        allDocuments: [],
        dropdownOpen: false,
    }

    componentDidMount() {
        if(this.props.user.type === 'admin'){
            this.getAllDocuments();
        }
    }

    getAllDocuments = async () => {
        await documentService.getAllDocuments().then(({documents}) =>{
            console.log('allDocs', documents)
            if(documents !== undefined){
                this.setState({ allDocuments: documents, status: 'success' })
            }
        })
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
        return await documentService.postOneDocument(formData).then((result) => {
            window.location.reload();
        });

    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    onFileChange = event => {

        // Update the state
        this.setState({ selectedFile: event.target.files[0] });

    };

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }


    render() {
        const { user } = this.props;
        const { documents, status, allDocuments, dropdownOpen } = this.state;
        const documentList = user.documents;

        return (
            <>
            <Header/>
            <section id="content" >
                    <Row className="pt-5 mt-5">
                        <Col xs='10'>
                            {user.type !== 'admin' ? (
                                <h2 className="subheaderdos">Mis documentos</h2>
                            ) : (
                                <h2 className="subheaderdos">Documentos</h2>
                            )}
                        </Col>
                        <Col xs='1' className="pt-5 mt-5">
                            <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle caret>
                                    Generar PDF
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <Link to={'/generate-subject-guide-request'}>Petición de guía de una asignatura</Link>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <Link to={'/generate-anexo-II'}>Crear Anexo II</Link>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    {user.type === 'teacher' &&
                                        <>
                                            <DropdownItem>
                                                <Link to={'/generate-anexo-V'}>Crear Anexo V</Link>
                                            </DropdownItem>
                                            <DropdownItem divider />
                                        </>
                                    }
                                    <DropdownItem>
                                        <Link to={'/court'}>Solicitar un tribunal</Link>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <Link to={'/generate-correction'}>Solicitar una corrección</Link>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <Link to={'/generate-pdf'}>Generar documento libre</Link>
                                    </DropdownItem>
                            </DropdownMenu>
                            </Dropdown>
                        </Col>
                        <Col xs='1' className="pt-5 mt-5">
                            <Button color="primary" onClick={this.toggleModal} >Subir un documento</Button>
                        </Col>
                    </Row>
                {user.type !== 'admin' && (
                    <>

                    {documentList && documentList.length > 0 ? (
                     <div>
                         {documentList.map((document) => {
                             return (
                                 <DataListView
                                     key={document._id}
                                     element={document}
                                     onCheckItem={this.onCheckItem}
                                     document={true}
                                 />
                             );
                         })
                         }
                     </div>
                    ) : (
                        <h2 className="text-center mt-3">No hay documentos</h2>
                    )}

                </>

                )}

                {user.type === 'admin' && (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab selectedClassName="selected-tab-style">
                                    Documentos
                                </Tab>
                                <Tab
                                    selectedClassName="selected-tab-style"
                                >
                                    Mis documentos
                                </Tab>
                            </TabList>

                            <TabPanel>
                                {allDocuments && allDocuments.length > 0 ? (
                                <div>
                                    {allDocuments.map((document) => {
                                        return (
                                            <DataListView
                                                key={document._id}
                                                element={document}
                                                onCheckItem={this.onCheckItem}
                                                document={true}
                                            />
                                        );
                                    })
                                    }
                                </div>
                                ) : (
                                    <h2 className="text-center">No hay documentos</h2>
                                )}
                            </TabPanel>

                            <TabPanel>
                            {documentList && documentList.length > 0 ? (
                                <div>
                                    {documentList.map((document) => {
                                        return (
                                            <DataListView
                                                key={document._id}
                                                element={document}
                                                onCheckItem={this.onCheckItem}
                                                document={true}
                                            />
                                        );
                                    })
                                    }
                                </div>
                                ) : (
                                    <h2 className="text-center">No hay documentos</h2>
                                )}
                            </TabPanel>
                        </Tabs>
                    </>
                )}


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
