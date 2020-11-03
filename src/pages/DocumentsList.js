import React, { Component } from 'react';
import axios from 'axios';
import DataListView from 'components/DataListView';
import AuthService from 'services/auth-service';
import subjectService from 'services/subject-service';
import loading from 'assets/images/loading.jpg';
import Header from 'components/Header.js';
import {Row, Col} from 'reactstrap';
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
    }

    componentDidMount() {
        this.getDocuments();
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

        await userService.getDocuments(user._id).then(({documents}) =>{ 
            console.log(documents); 
            if(documents !== undefined){
                this.setState({ documents, status: 'success' })
            }
        })
    }


    render() {

        const { documents, status } = this.state;
        return (
            <>
            <Header/>
            <section id="content" >
                <Row className="pt-5 mt-5">
                        <Col xs='10'>
                            <h2 className="subheaderdos">Mis documentos</h2>
                           
                        </Col>
                        <Col xs='2' className="pt-5 mt-5">
                            <Link to={'/add-document'} className={'btn btn-primary'} >Añadir documento</Link>
                        </Col>
                    </Row>

                {documents.length > 0 && status !== 'success' ? (
                    <div className={'text-center'}>
                        <h1>Cargando...</h1>
                    </div>
                ) : (
                    documents && documents.length > 0 ? (
                        <div>
                            {console.log('documents')}
                            {console.log(documents)}
                            {documents.map((document, i) => {
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
                )

                }
              

            </section>

            </>
        );


    }



}

export default withAuth(DocumentsList);