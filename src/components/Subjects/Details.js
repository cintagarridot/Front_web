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
                {console.log('subject cgarrido test')}
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
                                            <CardSubtitle tag="h3" className="mt-2 mb-2 text-muted" style={{paddingTop: '20px', paddingBottom: '10px'}}>Información general</CardSubtitle>
                                            <CardText className={'justify-content-center'}>
                                                <Row xs={'12'} sm={'6'} lg={'3'} xl={'3'} className={'justify-content-center mt-4'}>
                                                    <Col xs={'12'} sm={'3'} lg={'1'} xl={'1'}>
                                                        <div>
                                                            <h5>Curso</h5>
                                                        </div>
                                                    </Col>
                                                    <Col xs={'12'} sm={'2'} lg={'1'} xl={'1'}>
                                                        <div>
                                                            <h5>{subject.curso}</h5>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row xs={'12'} sm={'6'} lg={'3'} xl={'3'} className={'justify-content-center mt-3'} style={{paddingBottom: '20px'}}>
                                                    <Col xs={'12'} sm={'3'} lg={'1'} xl={'1'}>
                                                        <div>
                                                            <h5>Créditos</h5>
                                                        </div>
                                                    </Col>
                                                    <Col xs={'12'} sm={'2'} lg={'1'} xl={'1'}>
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
                                            <CardSubtitle tag="h3" className="mt-2 mb-2 text-muted" style={{paddingTop: '20px'}}>Contenido</CardSubtitle>
                                            <CardText>
                                                <h5 style={{paddingTop: '20px', paddingBottom: '20px', paddingLeft: '60px', paddingRight: '60px'}}>
                                                    {subject.content}
                                                </h5>
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
                                            <CardSubtitle tag="h3" className="mt-2 mb-2 text-muted" style={{paddingTop: '20px', paddingBottom: '10px'}}>Profesor/es</CardSubtitle>
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
                                            <CardSubtitle tag="h3" className="mt-2 mb-2 text-muted" style={{paddingTop: '20px', paddingBottom: '10px'}}>Alummos</CardSubtitle>
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
                            <Row style={{textAlign: 'end', alignItems: 'center', marginTop: '20px'}}>
                                <Col xs={'12'} sm={'12'} md={'12'} lg={'12'} className="buttonBack">
                                    <a href="javascript:history.back()">
                                        Volver
                                    </a>
                                </Col>
                            </Row>
                        </div>

                    }

            </>

        );


    }

}

export default SubjectDetails;
