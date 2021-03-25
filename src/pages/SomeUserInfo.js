import React, { Component } from 'react';
import perfilUser from 'assets/images/perfilUser.png';

import Header from 'components/Header';
import withAuth from 'components/withAuth';
import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, UncontrolledAlert} from 'reactstrap';
import axios from 'axios';
import userService from "../services/user-service";

class SomeUserInfo extends Component {

    state = {
        id: '',
        edit: false,
        username: '',
        firstName: '',
        lastName: '',
        photo: null,
        alert: '',
        success: '',
    }

    componentDidMount() {
        getUser();
    }


    getUser = async () => {      
        let paths = window.location.href.split('/');
        let userId = paths[paths.length-1];
        await userService.getOneUser(userId).then((data) => {
            console.log('getOneUser data', data)
            const { usuario } = data;
            this.setState({
                id: usuario._id,
                username: usuario.username,
                firstName: usuario.firstName,
                lastName: usuario.lastName,
                photo: usuario.photo,
                status: 'success',
            })
        })
        .catch(err => {
            console.log(err)
        });

    }

    render() {
        const { photo } = this.state;
        return (

            <div id="user">
                <Header />

                <h2 className="subheader">Información del usuario</h2>

                <Row className={'mb-5 pb-5'}>
                    {this.state.status === 'success' ? 
                    <>
                        <Col xs={'3'} md={'4'} lg={'3'} style={{ marginRight: '20px' }}>
                        {console.log('photo user', photo)}
                        {(!photo || photo === {} || photo === undefined || photo === null) ? (
                            <img src={perfilUser} alt="imagen usuario"/>
                        ) : (
                            <img src={photo.secure_url} alt={"imagen usuario"} />
                        )}

                        </Col>
                        <Col xs={'9'} md={'3'} lg={'7'}>
                            
                                <Row style={{textAlign: 'initial'}}>
                                    <Col xs={'12'} sm={'12'} md={'12'} lg={'12'} className={'pb-3'}>
                                        <Row>
                                            <h3 className='profile-text'>Nombre</h3>
                                        </Row>
                                        <Row>
                                            <h3>{this.state.firstName}</h3>
                                        </Row>
                                    </Col>
                                    <Col xs={'12'} sm={'12'} md={'12'} lg={'12'} className={'pb-3'}>
                                        <Row>
                                            <h3 className='profile-text'>Apellidos</h3>
                                        </Row>
                                        <Row>
                                            <h3>{this.state.lastName}</h3>
                                        </Row>
                                    </Col>
                                    <Col xs={'12'} sm={'12'} md={'12'} lg={'12'} className={'pb-3'}>
                                        <Row>
                                            <h3 className='profile-text'>Username</h3>
                                        </Row>
                                        <Row>
                                            <h3>{this.state.username}</h3>
                                        </Row>
                                    </Col>
                                {/* {(this.props.user.type === 'alumn' && this.props.user) &&
                                        <Col xs={'12'}>
                                            <Row>
                                                <h3 className='profile-text'>Número de asignaturas matriculadas</h3>
                                            </Row>
                                            <Row>
                                                <h3>{this.props.user.subjects.length}</h3>
                                            </Row>
                                        </Col>
                                    }
                                    {(this.props.user.type === 'teacher' && this.props.user) &&
                                        <Col xs={'12'}>
                                            <Row>
                                                <h3 className='profile-text'>Número de asignaturas impartidas</h3>
                                            </Row>
                                            <Row>
                                                <h3>{this.props.user.subjects.length}</h3>
                                            </Row>
                                        </Col>
                                    }*/}

                                </Row>

                        </Col>
                    </>
                : (
                    <Spinner color="info" />
                )}
                    
                </Row>

                <div className="clearfix"></div>

            </div>

        );
    }

}

export default withAuth(SomeUserInfo);
