import React, { Component } from 'react';
import perfilUser from 'assets/images/perfilUser.png';

import Header from 'components/Header';
import withAuth from 'components/withAuth';
import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, UncontrolledAlert} from 'reactstrap';
import axios from 'axios';
import userService from "../services/user-service";
import subjectService from 'services/subject-service';
import DataListView from 'components/DataListView';
import { Redirect } from 'react-router';

class SomeUserInfo extends Component {

    state = {
        id: '',
        edit: false,
        username: '',
        firstName: '',
        lastName: '',
        photo: null,
        alert: '',
        subjectsId: '',
        subjects: [],
        success: '',
        toDelete: false,
    }

    componentDidMount() {
        this.getUser();
        if(this.state.subjectsId.length > 0) {
           const s = this.getSubjects();
           console.log('s', s)
            this.setState({
                subjects: s,
            });
        }
    }

    getSubjects = async () => {
        let subjs = [];
        this.state.subjectsId.forEach(async (s) => {
            await subjectService.getSubjectById(s).then((data) => {
                subjs.push(data.subject);
            });
        });
        return subjs;
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
                subjectsId: usuario.subjects,
                status: 'success',
            })
        })
        .catch(err => {
            console.log(err)
        });

    }

    deleteUser = () => {
        confirmAlert({
            title: 'Dar de baja a un usuario',
            message: `Vas a dar de baja a ${this.state.firstName}, ¿estás seguro?`,
            buttons: [
                {
                    label: 'Sí',
                    onClick: () => {
                        userService.deleteUser(this.state.id).then((result) => {
                            console.log('result dar de baja user', result);
                            this.setState({
                                toDelete: true
                            });
                        });
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        this.setState({
                            toDelete: false
                        })
                    }
                }
            ]
        })
    }

    render() {
        const { photo, toDelete } = this.state;
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
                                    {(this.props.user.type === 'alumn') &&
                                        <Col xs={'12'}>
                                            <Row>
                                                <h3 className='profile-text'>Asignaturas matriculadas</h3>
                                            </Row>
                                            {this.state.subjects?.length > 0 ? this.state.subjects.map((subject, i) => {
                                                return (
                                                    <DataListView
                                                        key={subject.id}
                                                        element={subject}
                                                        onCheckItem={this.onCheckItem}
                                                        subjects
                                                    />
                                                );
                                            })
                                            : (
                                                <h2 className="text-center">{this.state.firstName} no está cursando ninguna asignatura</h2>
                                            )}   
                                        </Col>
                                    }
                                    {(this.props.user.type === 'teacher') &&
                                        <Col xs={'12'}>
                                            <Row>
                                                <h3 className='profile-text'>Asignaturas impartidas</h3>
                                            </Row>
                                            {this.state.subjects?.length > 0 ? this.state.subjects.map((subject, i) => {
                                                return (
                                                    <DataListView
                                                        key={subject.id}
                                                        element={subject}
                                                        onCheckItem={this.onCheckItem}
                                                        subjects
                                                    />
                                                );
                                            })
                                            : (
                                                <h2 className="text-center">{this.state.firstName} no está impartiendo ninguna asignatura</h2>
                                            )}   
                                        </Col>
                                    }

                                </Row>

                        </Col>
                    </>
                    : (
                        <Spinner color="info" />
                    )}
                    
                </Row>

                <Row className={'mt-5'} style={{textAlign: 'end'}}>
                    <Col xs={'12'} md={'3'} lg={'10'} className={'mt-5 mr-3'}>
                        <button className={'btn-danger'} style={{ fontSize: '12px' }} onClick={this.deleteUser} >Dar de baja</button>
                    </Col>
                </Row>

                {toDelete &&
                    <Redirect to='/users-list' />
                }

                <div className="clearfix"></div>

            </div>

        );
    }

}

export default withAuth(SomeUserInfo);
