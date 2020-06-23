import React, { Component } from 'react';
import logo from 'assets/images/logoetsi.png'

import Header from 'components/Header';
import withAuth from 'components/withAuth';
import { Col, Row } from 'reactstrap';
import axios from 'axios';

class User extends Component {

    state = {
        id: '',
        edit: false,
        username: '',
        firstName: '',
        lastName: '',
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

    render() {

        return (

            <div id="user">
                <Header />


                <h2 className="subheaderUser">Datos</h2>


                <Row className={'mb-5 pb-5'}>
                    <Col xs={'3'} style={{ marginRight: '20px' }}>
                        <img src={logo} class="app-logo" alt="Logotipo" />
                    </Col>
                    <Col xs={'7'}>
                        {!this.state.edit ?
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
                                {this.props.user &&
                                    <Col xs={'12'}>
                                        <h3 className='profile-text'>Número de asignaturas matriculadas</h3>
                                        <h3>{this.props.user.subjects.length}</h3>
                                    </Col>
                                }

                            </Row>
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
                                {this.props.user &&
                                    <Col xs={'12'}>
                                        <h3 className='profile-text'>Número de asignaturas matriculadas</h3>
                                        <h3>{this.props.user.subjects.length}</h3>
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

                <Row className={'mt-5'}>
                    <Col xs={'2'} className={'mt-5 mr-3'}>
                        <button style={{ fontSize: '12px' }} >Cambiar contraseña</button>
                    </Col>
                    <Col xs={'2'} className={'mt-5'}>
                        <button style={{ fontSize: '12px' }} onClick={this.props.logout}>Cerrar sesión</button>

                    </Col>
                </Row>


                <div className="clearfix"></div>


            </div>

        );

    }



}

export default withAuth(User);