import React, { Component } from 'react';
import {Col, Row} from "reactstrap";

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
                           
                            <Row>
                               <>
                                    <Col xs={'12'}>
                                        <h2>Curso: {subject.curso}</h2>
                                    </Col>
                               </>
                           </Row>
                            <Row className={'mt-5'}>
                               <>
                                    <Col xs={'12'}>
                                        <h2>Créditos: {subject.creditos}</h2>
                                    </Col>
                               </>
                           </Row>
                           
                           <Row className={'mt-5'}>
                               <>
                                    <Col xs={'12'}>
                                        <h2>Contenido</h2>
                                    </Col>
                               </>
                           </Row>
                           <Row className={'mt-3'}>
                               <>
                                    <Col xs={'12'}>
                                        <h4>{subject.content}</h4>
                                    </Col>
                               </>
                           </Row>

                           <Row className={'mt-5'}>
                               <>
                                    <Col xs={'12'}>
                                        <h2>Profesor/es</h2>
                                    </Col>
                               </>
                           </Row>
                           <Row className={'mt-3'}>
                               <>
                                    {subject.teachers && subject.teachers.length > 0 ?
                                        subject.teachers.map(t => {
                                        return <Col xs={'12'}>
                                         <h4>{t.firstName}{t.lastName}</h4>
                                        </Col>
                                    })
                                : (
                                    <Col xs={'12'}>
                                        <h4>No hay profesores que impartan esta asignatura</h4>
                                    </Col>
                                )}
                                   
                               </>
                           </Row>

                           <Row className={'mt-5'}>
                               <>
                                    <Col xs={'12'}>
                                        <h2>Alumnos</h2>
                                    </Col>
                               </>
                           </Row>
                           <Row className={'mt-3'}>
                               <>
                                    {subject.alumns && subject.alumns.length > 0 ?
                                        subject.alumns.map(a => {
                                        return <Col xs={'12'}>
                                         <h4>{a.firstName}{a.lastName}</h4>
                                        </Col>
                                    })
                                    : (
                                        <Col xs={'12'}>
                                            <h4>No hay alumnos en esta asignatura</h4>
                                        </Col>
                                    )}
                                   
                               </>
                           </Row>


                            

                        </div>

                    }


                    
            </>

        );


    } 



}

export default SubjectDetails;