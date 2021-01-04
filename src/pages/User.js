import React, { Component } from 'react';
import logo from 'assets/images/logoetsi.png'

import Header from 'components/Header';
import withAuth from 'components/withAuth';
import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, UncontrolledAlert} from 'reactstrap';
import axios from 'axios';
import authService from "../services/auth-service";

class User extends Component {

    state = {
        id: '',
        edit: false,
        username: '',
        firstName: '',
        lastName: '',
        modalNewPassword: false,
        newPass: '',
        newPass2: '',
        alert: '',
    }

    componentDidMount() {
        this.setState({
            id: this.props.user._id,
            username: this.props.user.username,
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
        })
    }

    editUser = () => {
        this.setState({
            edit: !this.state.edit,
        });
    }

    saveUser = async () => {
        this.editUser();

        const userToUpdate = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username
        }

        await axios.put('http://localhost:3800/users/' + this.state.id, userToUpdate)
            .then((data) => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            });

    }

    handleChange(event) {
        if(event.target.name === 'firstName'){
            this.setState({
                firstName: event.target.value
            });
        }

        if(event.target.name === 'lastName') {
            this.setState({
                lastName: event.target.value
            });
        }

        if(event.target.name === 'username') {
            this.setState({
                username: event.target.value
            });

        }

    }

    handleChangeNewPassword = (event) => {
        if(event.target.name === 'newPass'){
            this.setState({
                newPass: event.target.value
            });
        }

        if(event.target.name === 'newPass2') {
            this.setState({
                newPass2: event.target.value
            });
        }
    }

    toggleNewPassword = () => {
        console.log('antes', this.state.modalNewPassword)
        this.setState({
            modalNewPassword: !this.state.modalNewPassword
        });
        console.log('despues', this.state.modalNewPassword);
    }

    changePassword = () => {
        if(this.state.newPass === this.state.newPass2){
            authService.changePassword(this.state.id, this.state.newPass).then((result) => {
                window.location.reload();
            })
        }else{
            this.setState({
                alert: 'danger'
            })
        }
    }

    render() {
        return (

            <div id="user">
                <Header />

                {
                    this.state.alert === 'danger' &&
                    <UncontrolledAlert color={'danger'} className={'font'}>
                        No se ha podido cambiar la contraseña. Las contraseñas que se han introducido no son iguales.
                    </UncontrolledAlert>
                }

                <h2 className="subheaderUser">Datos</h2>

                <Row className={'mb-5 pb-5'}>
                    <Col xs={'3'} style={{ marginRight: '20px' }}>
                        <img src={logo} class="app-logo" alt="Logotipo" />
                    </Col>
                    <Col xs={'7'}>
                        {!this.state.edit ? (
                            <Row>
                                <Col xs={'12'} className={'pb-3'}>
                                    <h3 className='profile-text'>Nombre</h3>
                                    <h3>{this.state.firstName}</h3>
                                </Col>
                                <Col xs={'12'} className={'pb-3'}>
                                    <h3 className='profile-text'>Apellidos</h3>
                                    <h3>{this.state.lastName}</h3>
                                </Col>
                                <Col xs={'12'} className={'pb-3'}>
                                    <h3 className='profile-text'>Username</h3>
                                    <h3>{this.state.username}</h3>
                                </Col>
                                {(this.props.user.type === 'alumn' && this.props.user) &&
                                    <Col xs={'12'}>
                                        <h3 className='profile-text'>Número de asignaturas matriculadas</h3>
                                        <h3>{this.props.user.subjects.length}</h3>
                                    </Col>
                                }

                            </Row>
                        )
                            : (
                                <Row>
                                <Col xs={'12'} className={'pb-3'}>
                                    <h3 className='profile-text'>Nombre</h3>
                                    <input className={'font'} name='name' type="text" onChange={this.handleChange}></input>
                                </Col>
                                <Col xs={'12'} className={'pb-3'}>
                                    <h3 className='profile-text'>Apellidos</h3>
                                    <input className={'font'} name='lastName' type="text" onChange={this.handleChange}></input>
                                </Col>
                                <Col xs={'12'} className={'pb-3'}>
                                    <h3 className='profile-text'>Username</h3>
                                    <input className={'font'} name='username' type="text" onChange={this.handleChange}></input>
                                </Col>
                                {(this.props.user.type === 'teacher' && this.props.user) &&
                                    <Col xs={'12'}>
                                        <h3 className='profile-text'>Número de asignaturas impartidas</h3>
                                       {/*} <h3>{this.props.user.subjects.length}</h3>*/}
                                    </Col>
                                }

                            </Row>
                            )
                        }
                    </Col>
                    <Col xs={'1'} style={{textAlign: 'end', fontSize: '14px', cursor: 'pointer'}}>
                        {!this.state.edit ?
                            <a className={'profile-edit'} onClick={this.editUser}>Editar</a>
                            : (
                                <a className={'profile-edit'} onClick={this.saveUser}>Guardar</a>
                            )}
                    </Col>
                </Row>

                <Row className={'mt-5 justify-content-center'}>
                    <Col xs={'2'} className={'mt-5'}>
                        <button style={{ fontSize: '12px' }} onClick={this.changePassword} >Cambiar contraseña</button>
                    </Col>
                </Row>


                {this.state.modalNewPassword &&
                <div>
                    <Modal isOpen={this.state.modalNewPassword} toggle={this.toggleNewPassword} >
                        <ModalHeader>Nueva contraseña</ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col xs={'12'}>
                                    <label className={'mt-2'} htmlFor='text'>Introduce la nueva contraseña</label>
                                </Col>
                                <Col xs={'12'}>
                                    <input className={'mt-2 font'} id='text' required='true' type='text' name='newPass' onChange={this.handleChangeNewPassword} />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={'12'}>
                                    <label className={'mt-2'} htmlFor='text'>Repite la nueva contraseña</label>
                                </Col>
                                <Col xs={'12'}>
                                    <input className={'mt-2 font'} id='text' required='true' type='text' name='newPass2' onChange={this.handleChangeNewPassword} />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.changePassword}>Guardar</Button>{' '}
                            <Button color="secondary" onClick={this.toggleNewPassword}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                }

                <div className="clearfix"></div>


            </div>



        );

    }



}

export default withAuth(User);
