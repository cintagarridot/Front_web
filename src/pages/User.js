import React, { Component } from 'react';
import perfilUser from 'assets/images/perfilUser.png';

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
        photo: null,
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
            photo: this.props.user.photo,
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
        this.setState({
            modalNewPassword: !this.state.modalNewPassword
        });
    }

    changePassword = () => {
        console.log('newpass',this.state.newPass)
        console.log('newpass2', this.state.newPass2)
        if(this.state.newPass === this.state.newPass2){
            authService.changePassword(this.state.id, this.state.newPass).then((result) => {
                window.location.reload();
            })
        }else{
            this.toggleNewPassword();
            this.setState({
                alert: 'danger'
            })
        }
    }

    render() {
        const { photo } = this.state;
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
                    <Col xs={'4'} md={'4'} lg={'4'} style={{ marginRight: '20px' }}>
                        {console.log('photo user', photo)}
                        {(!photo || photo === {} || photo === undefined || photo === null) &&
                            <img src={perfilUser} alt="imagen usuario"/>
                        }

                    </Col>
                    <Col xs={'8'} md={'8'} lg={'8'}>
                        {!this.state.edit ? (
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
                        )
                            : (
                                <Row style={{textAlign: 'initial'}}>
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
                    {/*<Col xs={'1'} style={{textAlign: 'end', fontSize: '14px', cursor: 'pointer'}}>*/}
                    {/*    {!this.state.edit ?*/}
                    {/*        <a className={'profile-edit'} onClick={this.editUser}>Editar</a>*/}
                    {/*        : (*/}
                    {/*            <a className={'profile-edit'} onClick={this.saveUser}>Guardar</a>*/}
                    {/*        )}*/}
                    {/*</Col>*/}
                </Row>

                <Row className={'mt-5'} style={{textAlign: 'end'}}>
                    <Col xs={'2'} md={'2'} lg={'2'} className={'mt-5 mr-3'}>
                        <button style={{ fontSize: '12px' }} onClick={this.toggleNewPassword} >Cambiar contraseña</button>
                    </Col>
                    <Col xs={'2'} md={'2'} lg={'2'} className={'mt-5'}>
                        <button style={{ fontSize: '12px' }} onClick={this.toggleNewPassword} >Cambiar foto</button>
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
                                    <input className={'mt-2 font'} id='text' required='true' type="password" name='newPass' onChange={this.handleChangeNewPassword} />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={'12'}>
                                    <label className={'mt-2'} htmlFor='text'>Repite la nueva contraseña</label>
                                </Col>
                                <Col xs={'12'}>
                                    <input className={'mt-2 font'} id='text' required='true' type="password" name='newPass2' onChange={this.handleChangeNewPassword} />
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
