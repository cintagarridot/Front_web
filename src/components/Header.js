import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import logo from 'assets/images/logo.svg';

import withAuth from './withAuth';

class Header extends Component{

    render() {
        const { user } = this.props;
        return (
            <header id="header">
                {/* <!-- creamos una etiqueta para centrar el contenido -->*/}
                <div className="center">
                    {/*<!-- LOGO -->*/}
                    <div id="logo">
                       {/*} <img src={logo} className="app-logo" alt="Logotipo" />*/}
                        <span id="brand"> {/*<!-- span es una etiqueta generica y brand es como la marca del sitio -->*/}
                            <strong>UHU</strong>Web
                     </span>
                    </div>


                    {/*-- MENU DE NAVEGACIÓN -->*/}
                    <nav id="menu"> {/*<!-- La etiqueta nav representa la parte de los links que llevan a otras paginas--> */}
                        <ul>
                            {user.type !== 'admin' && 
                                <li>
                                    <NavLink to="/home" activeClassName="active">Inicio</NavLink>
                                </li>
                            }
                            {this.props.user.type === 'admin' &&
                                <>
                                    <li>
                                        <NavLink to="/users-list" activeClassName="active">Usuarios</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/subjects-list" activeClassName="active">Asignaturas</NavLink>
                                    </li>
                                </>
                            }
                            <li>
                                <NavLink to="/chat" activeClassName="active">Chat</NavLink>
                            </li>
                            <li>
                                <NavLink to="/news" activeClassName="active">Noticias</NavLink>
                            </li>
                            <li>
                                <NavLink to="/user" activeClassName="active">Perfil</NavLink>
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

export default withAuth(Header);