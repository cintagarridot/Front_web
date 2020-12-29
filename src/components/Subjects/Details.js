import React, { Component } from 'react';
import {Card, CardBody, CardSubtitle, CardText, Col, Row} from "reactstrap";

import subjectService from 'services/subject-service';
import Header from 'components/Header';

class SubjectDetails extends Component {

    state = {
        subject: {},
        id: '',
        userId: '',
        user: {},
        status: null,
    }

    componentDidMount() {

        const paramId = this.props.match.params.id;

        if(paramId){
            this.setState({
                id: paramId
            })
            this.getSubject(paramId);

        }

    }

    getSubject = async (id) => {
        await subjectService.getSubjectById(id).then(data => {
            this.setState({
                subject: data.subject,
                status: 'success',
            })

        })
    }


    render() {

        const { subject } = this.state;

        return (
            <>
                {console.log('subject')}
                {console.log(subject)}

                <Header />

                    {subject &&

                        <div className={'mt-5 pt-5'}>
                            <Row>
                                <>
                                    <Col xs={'12'}>
                                        <h2 className="subheaderdos">{subject.title}</h2>
                                    </Col>
                                </>
                            </Row>

                            <Row className={'mt-3'}>
                                <Col xs={'12'} sm={'12'} xl={'12'} lg={'12'}>
                                    <Card>
                                        <CardBody>
                                            {/*<CardTitle tag="h5">Card title</CardTitle>*/}
                                            <CardSubtitle tag="h3" className="mt-2 mb-2 text-muted">Información general</CardSubtitle>
                                            <CardText className={'justify-content-center'}>
                                                <Row xs={'4'} sm={'2'} lg={'2'} xl={'2'} className={'justify-content-center mt-4'}>
                                                    <Col xs={'6'} sm={'1'} lg={'1'} xl={'1'}>
                                                        <div>
                                                            <h5>Curso</h5>
                                                        </div>
                                                    </Col>
                                                    <Col xs={'1'} sm={'1'} lg={'1'} xl={'1'}>
                                                        <div>
                                                            <h5>{subject.curso}</h5>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row xs={'4'} sm={'2'} lg={'2'} xl={'2'} className={'justify-content-center mt-2'}>
                                                    <Col xs={'6'} sm={'1'} lg={'1'} xl={'1'}>
                                                        <div>
                                                            <h5>Créditos</h5>
                                                        </div>
                                                    </Col>
                                                    <Col xs={'1'} sm={'1'} lg={'1'} xl={'1'}>
                                                        <div>
                                                            <h5>{subject.creditos}</h5>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                           </Row>

                            <Row className={'mt-5'}>
                                <Col xs={'12'} sm={'12'} xl={'12'} lg={'12'}>
                                    <Card>
                                        <CardBody>
                                            {/*<CardTitle tag="h5">Card title</CardTitle>*/}
                                            <CardSubtitle tag="h3" className="mt-2 mb-2 text-muted">Contenido</CardSubtitle>
                                            <CardText>
                                                <h5>{subject.content}</h5>
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>

                            <Row className={'mt-5'}>
                                <Col xs={'12'} sm={'12'} xl={'12'} lg={'12'}>
                                    <Card>
                                        <CardBody>
                                            {/*<CardTitle tag="h5">Card title</CardTitle>*/}
                                            <CardSubtitle tag="h3" className="mt-2 mb-2 text-muted">Profesor/es</CardSubtitle>
                                            <CardText>
                                                <Row className={'mt-3'}>
                                                    <>
                                                        {subject.teachers && subject.teachers.length > 0 ?
                                                            subject.teachers.map(t => {
                                                                return <Col xs={'12'}>
                                                                    <h5>{t.firstName} {t.lastName}</h5>
                                                                </Col>
                                                            })
                                                            : (
                                                                <Col xs={'12'}>
                                                                    <h5>No hay profesores que impartan esta asignatura</h5>
                                                                </Col>
                                                            )}

                                                    </>
                                                </Row>
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>

                            <Row className={'mt-5'}>
                                <Col xs={'12'} sm={'12'} xl={'12'} lg={'12'}>
                                    <Card>
                                        <CardBody>
                                            {/*<CardTitle tag="h5">Card title</CardTitle>*/}
                                            <CardSubtitle tag="h3" className="mt-2 mb-2 text-muted">Alummos</CardSubtitle>
                                            <CardText>
                                                <Row className={'mt-3'}>
                                                    <>
                                                        {subject.alumns && subject.alumns.length > 0 ?
                                                            subject.alumns.map(a => {
                                                                return <Col xs={'12'}>
                                                                    <h5>{a.firstName} {a.lastName}</h5>
                                                                </Col>
                                                            })
                                                            : (
                                                                <Col xs={'12'}>
                                                                    <h5>No hay alumnos en esta asignatura</h5>
                                                                </Col>
                                                            )}

                                                    </>
                                                </Row>
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </div>

                    }

            </>

        );


    }

}

export default SubjectDetails;
