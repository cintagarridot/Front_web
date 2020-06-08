import React, { Component } from 'react';
import logo from 'assets/images/logoetsi.png'

import Header from 'components/Header';
import withAuth from 'components/withAuth';

class User extends Component {

    render() {
        console.log('props del user')
console.log(this.props)
        return (

            <div id="user">
                <Header />

                <section id="contentuser">
                    <h2 className="subheaderdos">Nombre Usuario</h2>


                    <div id="imgUsuario">
                        <img src={logo} class="app-logo" alt="Logotipo" />

                        <h3>Datos</h3><br />

                    </div>

                    <div className="clearfix"></div>
                    <div id="botonUser">
                        <button className="datosUser">Cambiar contraseña</button><br />
                        <button className="datosUser" onClick={this.props.logout}>Cerrar sesión</button>
                    </div>

                </section>
            </div>

        );

    }



}

export default withAuth(User);