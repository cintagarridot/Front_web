import React, { Component } from 'react';
import axios from 'axios';
import DataListView from 'components/DataListView';
import AuthService from 'services/auth-service';
import subjectService from 'services/subject-service';
import loading from 'assets/images/loading.jpg';
import Header from 'components/Header.js';
import {Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';


class SubjectsList extends Component {

    state = {
        subjects: {},
        status: null,
        lastChecked: null,
        selectedItems: null,
        loading: true,
    }

    componentDidMount() {
        this.getSubjects();
    }

    clickItem = (item, event) => {
        event.preventDefault();
        this.props.onClickItem(item);
    };

    onCheckItem = (event, id) => {
        document.activeElement.blur();
    };

    getSubjects = async () => {
        await subjectService.getSubjects().then(({subjects}) =>{ console.log(subjects); this.setState({ subjects, status: 'success' })})
    }


    render() {

        const { subjects, status } = this.state;
        return (
            <>
            <Header/>
            <section id="content" >
                <Row className="pt-5 mt-5">
                        <Col xs='10'>
                            <h2 className="subheaderdos">Asignaturas</h2>

                        </Col>
                        <Col xs='2' className="pt-5 mt-5">
                            <Link to={'/add-subject'} className={'btn btn-primary'} >Añadir asignatura</Link>
                        </Col>
                    </Row>

                {status !== 'success' ? (
                    // <div className={'loading'}>
                    //     <img src={loading} />
                    // </div>
                    <div>
                        <h2>Cargando...</h2>
                    </div>
                ) : (
                    subjects && subjects.length > 0 ? (
                        <div>
                            {console.log('subjects')}
                            {console.log(subjects)}
                            {subjects.map((subject, i) => {
                                return (
                                    <DataListView
                                        key={subject.id}
                                        element={subject}
                                        onCheckItem={this.onCheckItem}
                                        subjects
                                    />
                                );
                            })
                            }
                        </div>
                    ) : (
                        <h2 className="text-center">No hay asignaturas</h2>
                    )
                )

                }


            </section>

            </>
        );


    }



}

export default SubjectsList;
