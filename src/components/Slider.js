import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

/*import logomoodle from '../assets/images/logomoodle.png';
import logoetsi from '../assets/images/logoetsi.png';
import logouhu from '../assets/images/logouhu.jpg';*/
import chatImage from 'assets/images/chat.jpeg';
import documentoImage from 'assets/images/documentos.jpg';
import notificationImage from 'assets/images/notificacion.png';
import noticiaImage from 'assets/images/noticias.jpeg';
import perfilUsuario from 'assets/images/usuario.jpg';
import asignaturasImage from 'assets/images/asignaturas.png';
import News from 'components/News/List';
import Header from 'components/Header';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import moment from 'moment';
import axios from 'axios';
import withAuth from "./withAuth";
import {Col, Row} from "reactstrap";

class Slider extends Component {

    state = {
        idToUpdate: null,
        idToDelete: null,
        toUpdate: false,
        toDelete: false
    }

    updateNews = (id) => {
        this.setState({
            idToUpdate: id,
            toUpdate: true
        })

        alert("Noticia editada!");

    }

    handleDelete = (id) => {
        confirmAlert({
            title: 'Borrar noticia',
            message: '¿Estás seguro de borrar esta noticia?',
            buttons: [
                {
                    label: 'Borrar',
                    onClick: () => {

                        this.setState({
                            idToDelete: id,
                            toDelete: true
                        });

                    }
                },
                {
                    label: 'Cancelar',
                    onClick: () => {
                        this.setState({
                            toDelete: false
                        })
                    }
                }
            ]
        })


    };

    /*Peticion para eliminar una noticia*/
    deleteNews = (toDelete) => {
        const news = axios.create({
            baseURL: 'https://uhu-back.herokuapp.com',
            withCredentials: true, //poner siempre, es el que controla la cookie del header en una petición y es lo que lee el back para saber si tiene current user
          })
        news.delete("/news/" + toDelete)
            .then(res => {
                console.log("NOTICIA BORRADA: ");
                console.log(res.data);
                this.setState({
                    deleted: true,
                    status: 'success'
                })
            })
    }



    render() {

        return (
            <>
                <Header />

                <div id="slider" className={this.props.size} > {/*<!--le podemos poner varias clases para usarlas dependiendo de que pagina estemos-->*/}

                    {this.props.size === 'slider-initial' &&
                        <div className="slider-data">
                            <h1>{this.props.title}</h1>

                        </div>
                    }

                    {this.props.size === 'slider-sesion' &&
                        <div>
                            <h1 className="titulo-inicioSesion">{this.props.title}</h1>
                            <input type="text" name="usuario" placeholder={this.props.input1} />
                            <input type="text" name="contraseña" placeholder={this.props.input2} />
                            <Link to="/home">{this.props.btn}</Link>
                        </div>
                    }

                    {this.props.size === 'slider-noticia' && this.props.image &&
                        <div>
                            <h1 className="subheaderdos">{this.props.title}</h1>

                            <div id="newsDivImage">
                                <img src={this.props.image}></img>
                            </div>


                            <div id="newsDivContent">
                                <p>{this.props.content}</p>
                            </div>

                            <div id="newsDivAuthor">
                                <h2>Autor</h2>
                                <h3>{this.props.user.firstName} {this.props.user.lastName}</h3>

                            </div>
                            <div id="newsDivDate">
                                <h2>Fecha: {this.props.date}</h2>
                            </div>

                            <div id="newsButton">
                                <button className="delete" onClick={() => this.handleDelete(this.props.id)}>Borrar</button>
                            </div>

                        </div>
                    }

                    {this.props.size === 'slider-noticia' && !this.props.image &&
                        <div>
                            {console.log(this.props.author)}
                            <h1 className="subheaderdos">{this.props.title}</h1>
                            <div id="newsDivContent2">
                                <p>{this.props.content}</p>
                            </div>
                            <div id="newsDivAuthor">
                                <h3>Autor</h3>
                                <h4>{this.props.author.firstName} {this.props.author.lastName}</h4>
                            </div>
                            <div id="newsDivDate">
                                <h2>Fecha: {moment(this.props.date).format('L')}</h2>
                            </div>

                            {console.log('this.props.author', this.props.author)}
                            {console.log('this.props.user', this.props.user)}
                            {((this.props.author._id === this.props.user._id) || (this.props.user.type === 'admin')) &&
                                <div id="newsButton2">
                                    <button className="delete" onClick={() => this.handleDelete(this.props.id)}>Borrar
                                    </button>
                                    {/*{this.state.toUpdate &&*/}
                                    {/*<News*/}
                                    {/*    idToUpdate={this.state.idToUpdate}*/}
                                    {/*    update="true"*/}
                                    {/*/>*/}
                                    {/*}*/}

                                </div>
                            }
                        </div>
                    }

                    {
                        this.props.size === 'slider-smallInfo' &&
                        <div>
                            <h1>{this.props.nameAuthor}</h1>
                        </div>
                    }

                    {this.props.size === 'principalPageButtons' &&
                        <>
                            <Row>
                              <Col>
                                    <Row className={'text-center'}>
                                        <Col xs={'4'} md={'4'} sm={'4'} lg={'4'}>
                                            <Row>
                                                <Link to={'/news'}>
                                                    <img src={noticiaImage} alt={'noticias'}/>
                                                </Link>
                                            </Row>
                                            <Row>
                                                <a href={'/Front_web/#/news'} className={'buttonA'}>Noticias</a>
                                            </Row>
                                        </Col>
                                        <Col xs={'4'} md={'4'} sm={'4'} lg={'4'}>
                                            <Row>
                                                <Link to={'/documents'}>
                                                    <img src={documentoImage} alt={'documentos'}/>
                                                </Link>
                                            </Row>
                                            <Row>
                                                <a href={'/Front_web/#/documents'} className={'buttonA'}>Documentos</a>
                                            </Row>
                                        </Col>
                                        <Col xs={'4'} md={'4'} sm={'4'} lg={'4'}>
                                            <Row>
                                                <Link to={'/notifications'}>
                                                    <img src={notificationImage} alt={'notificaciones'}/>
                                                </Link>
                                            </Row>
                                            <Row>
                                                <a href={'/Front_web/#/notifications'} className={'buttonA'}>Notificaciones</a>
                                            </Row>
                                        </Col>
                                    </Row>

                                    <Row className={'text-center'}>
                                        <Col xs={'4'} md={'4'} sm={'4'} lg={'4'}>
                                            {this.props.user.type === 'admin' ? (
                                                <>
                                                    <Row>
                                                        <Link to={'/subjects-list'}>
                                                            <img src={asignaturasImage} alt={'subjects'}/>
                                                        </Link>
                                                    </Row>
                                                    <Row>
                                                        <a href={'/Front_web/#/subjects-list'} className={'buttonA'}>Asignaturas</a>
                                                    </Row>
                                                </>
                                            ) : (
                                                <>
                                                    <Row>
                                                        <Link to={'/my-subjects'}>
                                                            <img src={asignaturasImage} alt={'subjects'}/>
                                                        </Link>
                                                    </Row>
                                                   <Row>
                                                       <a href={'/Front_web/#/my-subjects'} className={'buttonA'}>Asignaturas</a>
                                                   </Row>
                                                </>
                                                )}
                                        </Col>
                                        <Col xs={'4'} md={'4'} sm={'4'} lg={'4'}>
                                            <Row>
                                                <Link to={'/chat'}>
                                                    <img src={chatImage} alt={'chat'}/>
                                                </Link>
                                            </Row>
                                            <Row>
                                                <a href={'/Front_web/#/chat'} className={'buttonA'}>Chat</a>
                                            </Row>
                                        </Col>
                                        <Col xs={'4'} md={'4'} sm={'4'} lg={'4'}>
                                            <Row>
                                                <Link to={'/user'}>
                                                    <img src={perfilUsuario} alt={'perfil usuario'}/>
                                                </Link>
                                            </Row>
                                            <Row>
                                                <a href={'/Front_web/#/user'} className={'buttonA'}>Perfil usuario</a>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </>
                    }

                    {this.state.toUpdate &&
                        <News
                            idToUpdate={this.state.idToUpdate}
                            update="true"
                        />
                    }

                    {this.state.toDelete && this.state.idToDelete !== null &&
                        <div>
                            {this.deleteNews(this.state.idToDelete)}
                            <Redirect to="/news?deleted=true"></Redirect>
                        </div>
                    }

                    <div className="clearfix"></div>
                </div>

            </>

        );
    }
}
export default withAuth(Slider);
