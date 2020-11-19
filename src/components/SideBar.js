import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';


class SideBar extends Component {



    render() {

        return (

            <aside id="sidebar"> {/*<!--La mejor etiqueta es aside para crear los sidebar (barras laterates)-->*/}

                <div className="sideBarNoticia">
                    <h3 className="crearNoticiaText">{this.props.texto}</h3>
                    {/*} <Link to='/noticias/crear-nueva-noticia' className="botonNoticia">{this.props.btn}</Link>*/}
                    {/*<ModalExample></ModalExample>*/}
                    <button><Link to='/noticias/crear-nueva-noticia' className="botonNoticia">{this.props.btn}</Link></button>
                </div>

            </aside>

        );

    }
}

export default SideBar;