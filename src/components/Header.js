import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import logo from 'assets/images/logo.svg';

import withAuth from './withAuth';
import {Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

class Header extends Component{

    constructor() {
        super();
        this.state = {
            dropdownOpen: false,
        }
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }

    render() {
        const { user } = this.props;
        return (
            <header id="header" className={'clearfix'}>
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
                                    <NavLink to="/documents" activeClassName="active">Documentos</NavLink>
                                </li>
                            <li>
                                <NavLink to="/notifications" activeClassName="active">Notificaciones</NavLink>
                            </li>
                            <li>
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle caret>
                                        {user.username}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            <Link to={'/user'}>Ver perfil</Link>
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            <p onClick={this.props.logout}>Cerrar sesión</p>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
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
