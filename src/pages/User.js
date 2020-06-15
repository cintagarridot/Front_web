import React, { Component } from 'react';
import logo from 'assets/images/logoetsi.png'

import Header from 'components/Header';
import withAuth from 'components/withAuth';
import { Col, Row } from 'reactstrap';

class User extends Component {

    componentDidMount() {

    }

    render() {

        return (

            <div id="user">
                <Header />


                <h2 className="subheaderUser">Datos</h2>

                {/*} <div id="imgUsuario">*/}
                <Row className={'mb-5 pb-5'}>
                    <Col xs={'3'} style={{ marginRight: '20px' }}>
                        <img src={logo} class="app-logo" alt="Logotipo" />
                    </Col>
                    <Col xs={'5'}>
                        <Row>
                            <Col xs={'12'} className={'pb-3'}>
                                <h3 className='profile-text'>Nombre</h3>
                                <h3>{this.props.user.firstName}</h3>
                            </Col>
                            <Col xs={'12'} className={'pb-3'}>
                                <h3 className='profile-text'>Apellidos</h3>
                                <h3>{this.props.user.lastName}</h3>
                            </Col>
                            <Col xs={'12'} className={'pb-3'}>
                                <h3 className='profile-text'>Username</h3>
                                <h3>{this.props.user.username}</h3>
                            </Col>
                            <Col xs={'12'}>
                                <h3 className='profile-text'>Número de asignaturas matriculadas</h3>
                                <h3>{this.props.user.subjects.length}</h3>
                            </Col>
                        </Row>


                    </Col>
                </Row>

                <Row className={'mt-5'}>
                    <Col xs={'2'} className={'mt-5 mr-3'}>
                        <button style={{fontSize: '12px'}} >Cambiar contraseña</button>
                    </Col>
                    <Col xs={'2'} className={'mt-5'}>
                        <button style={{fontSize: '12px'}} onClick={this.props.logout}>Cerrar sesión</button>

                    </Col>
                </Row>


                <div className="clearfix"></div>



            </div>

        );

    }



}

export default withAuth(User);