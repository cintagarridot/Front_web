import React, { Component } from 'react';


//import Asignatura from './Asignatura';

/*import Slider from './Slider';
import Header from './Header';*/

import withAuth from 'components/withAuth';
import Asignatura from 'components/Asignatura';
import Header from 'components/Header';
import Slider from 'components/Slider';
import {Card, CardBody, Col, Row} from "reactstrap";
import {Link} from "react-router-dom";
import noticiaImage from "../assets/images/noticias.jpeg";
import documentoImage from "../assets/images/documentos.jpg";
import notificationImage from "../assets/images/notificacion.png";
import asignaturasImage from "../assets/images/asignaturas.png";
import chatImage from "../assets/images/chat.jpeg";
import perfilUsuario from "../assets/images/usuario.jpg";

class Principal extends Component {


    render() {

        return (
            <div>
                <Header />
                <Slider
                    size="slider-initial"
                    title="Departamento de Tecnologías de la Información"
                    button="etsi"
                    button2="moodle"
                    button3="uhu"
                />

                <Row className={'mt-5'}>
                    <Col xs={'12'} md={'12'} sm={'12'} lg={'12'}>
                        <Card>
                            <CardBody>
                                <>
                                    <Row className={'directAccessButtons'}>
                                        <Col xs={'12'} sm={'12'} md={'12'} lg={'12'}>
                                            <Row className={'text-center'}>
                                                <Col xs={'12'} md={'6'} sm={'4'} lg={'4'}>
                                                    <Row className={'justify-content-center mt-5'}>
                                                        <Link to={'/news'}>
                                                            <img src={noticiaImage} alt={'noticias'}/>
                                                        </Link>
                                                    </Row>
                                                    <Row className={'justify-content-center mt-4'}>
                                                        <a href={'/Front_web/#/news'} className={'buttonA'}>Noticias</a>
                                                    </Row>
                                                </Col>
                                                <Col xs={'12'} md={'6'} sm={'4'} lg={'4'}>
                                                    <Row className={'justify-content-center mt-5'}>
                                                        <Link to={'/documents'}>
                                                            <img src={documentoImage} alt={'documentos'}/>
                                                        </Link>
                                                    </Row>
                                                    <Row className={'justify-content-center mt-4'}>
                                                        <a href={'/Front_web/#/documents'} className={'buttonA'}>Documentos</a>
                                                    </Row>
                                                </Col>
                                                <Col xs={'12'} md={'6'} sm={'4'} lg={'4'}>
                                                    <Row className={'justify-content-center mt-5'}>
                                                        <Link to={'/notifications'}>
                                                            <img src={notificationImage} alt={'notificaciones'}/>
                                                        </Link>
                                                    </Row>
                                                    <Row className={'justify-content-center mt-4'}>
                                                        <a href={'/Front_web/#/notifications'} className={'buttonA'}>Notificaciones</a>
                                                    </Row>
                                                </Col>
                                            </Row>

                                            <Row className={'text-center'}>
                                                <Col xs={'12'} md={'6'} sm={'4'} lg={'4'}>
                                                    {this.props.user.type === 'admin' ? (
                                                        <>
                                                            <Row className={'justify-content-center mt-5'}>
                                                                <Link to={'/subjects-list'}>
                                                                    <img src={asignaturasImage} alt={'subjects'}/>
                                                                </Link>
                                                            </Row>
                                                            <Row className={'justify-content-center mt-4 mb-5'}>
                                                                <a href={'/Front_web/#/subjects-list'} className={'buttonA'}>Asignaturas</a>
                                                            </Row>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Row className={'justify-content-center mt-5'}>
                                                                <Link to={'/my-subjects'}>
                                                                    <img src={asignaturasImage} alt={'subjects'}/>
                                                                </Link>
                                                            </Row>
                                                            <Row className={'justify-content-center mt-4 mb-5'}>
                                                                <a href={'/Front_web/#/my-subjects'} className={'buttonA'}>Asignaturas</a>
                                                            </Row>
                                                        </>
                                                    )}
                                                </Col>
                                                <Col xs={'12'} md={'6'} sm={'4'} lg={'4'}>
                                                    <Row className={'justify-content-center mt-5'}>
                                                        <Link to={'/chat'}>
                                                            <img src={chatImage} style={{width: '180px'}} alt={'chat'}/>
                                                        </Link>
                                                    </Row>
                                                    <Row className={'justify-content-center mt-4 mb-5'}>
                                                        <a href={'/Front_web/#/chat'} className={'buttonA'}>Chat</a>
                                                    </Row>
                                                </Col>
                                                <Col xs={'12'} md={'6'} sm={'4'} lg={'4'}>
                                                    <Row className={'justify-content-center mt-5'}>
                                                        <Link to={'/user'}>
                                                            <img src={perfilUsuario} alt={'perfil usuario'}/>
                                                        </Link>
                                                    </Row>
                                                    <Row className={'justify-content-center mt-4 mb-5'}>
                                                        <a href={'/Front_web/#/user'} className={'buttonA'}>Perfil usuario</a>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>



            </div>

        );

    }

}

export default withAuth(Principal);
