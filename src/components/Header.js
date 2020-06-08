import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import logo from 'assets/images/logo.svg';

import withAuth from './withAuth';

class Header extends Component{

    render() {

        return (
            <header id="header">
                {/* <!-- creamos una etiqueta para centrar el contenido -->*/}
                <div className="center">
                    {/*<!-- LOGO -->*/}
                    <div id="logo">
                        <img src={logo} className="app-logo" alt="Logotipo" />
                        <span id="brand"> {/*<!-- span es una etiqueta generica y brand es como la marca del sitio -->*/}
                            <strong>UHU</strong>Web
                     </span>
                    </div>


                    {/*-- MENU DE NAVEGACIÓN -->*/}
                    <nav id="menu"> {/*<!-- La etiqueta nav representa la parte de los links que llevan a otras paginas--> */}
                        <ul>
                            <li>
                                <NavLink to="/home" activeClassName="active">Inicio</NavLink>
                            </li>
                            <li>
                                <NavLink to="/chat" activeClassName="active">Chat</NavLink>
                            </li>
                            <li>
                                <NavLink to="/news" activeClassName="active">Noticias</NavLink>
                            </li>
                            <li>
                                <NavLink to="/user" activeClassName="active">Usuario</NavLink>
                            </li>

                        </ul>
                    </nav>

                    {/* <!--LIMPIAR FLOTADOS (PARA QUE EL TEXTO QUE PONGAMOS ABAJO NO SE SUBA HACIA ARRIBA-->*/}
                    <div className="clearfix"></div>
                </div>

            </header>
        );
    }




}

export default Header;