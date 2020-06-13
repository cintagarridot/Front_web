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
                <Row>
                    <Col xs={'3'} style={{marginRight: '20px'}}>
                        <img src={logo} class="app-logo" alt="Logotipo" />
                    </Col>
                    <Col xs={'5'}>
                        <h3>Nombre: {this.props.user.firstName}</h3>
                        <h3>Apellidos: {this.props.user.lastName}</h3>
                        <h3>Username: {this.props.user.username}</h3>
                    </Col>
                </Row>




                <div className="clearfix"></div>
                <div id="botonUser">
                    <button className="datosUser">Cambiar contraseña</button><br />
                    <button className="datosUser" onClick={this.props.logout}>Cerrar sesión</button>
                </div>


            </div>

        );

    }



}

export default withAuth(User);