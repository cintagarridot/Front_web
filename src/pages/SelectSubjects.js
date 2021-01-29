import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';

import subjectService from '../services/subject-service';
import userService from '../services/user-service';

import withAuth from 'components/withAuth';
import {Col, CustomInput, Row} from 'reactstrap';
import UHU from "../assets/images/UHU.png";

class SelectSubjects extends Component {


        state = {
            list: [],
            subjectsSelected: [],
            userSubjects: this.props.user.subjects,
            redirectToHome: false,
        }


    componentDidMount() {
        if(this.props.user.subjects.length > 0){
           console.log('entraaa')
            this.setState({
                redirectToHome: true,
            })
        }
        subjectService.getSubjects().then(data => {
            console.log('data list subject', data)
            this.setState({
                list: data.subjects
            })
        });

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
            console.log('prevProps', prevProps.user.subjects)
            console.log('actualProps', this.props.user.subjects)
            console.log('componentDidUpdate condition', prevProps.user.subjects !== this.props.user.subjects)
            if(prevProps.user.subjects !== this.props.user.subjects){
                return <Redirect to={'/home'}/>
            }
            if(this.props.user.subjects > 0){
                return <Redirect to={'/home'}/>
            }
    }


    checkSelected = (target) => {
        const { subjectsSelected } = this.state;
        if(subjectsSelected.includes(target)) {
            let i = subjectsSelected.indexOf(target);
            subjectsSelected.splice(i, 1);
        } else{
            subjectsSelected.push(target)
        }
        console.log('subjectsSelected', subjectsSelected)
    }

    addSubjectsInUser = async () => {
            if(this.state.subjectsSelected.length > 0) {
                await userService.addSubjectsInUser(this.props.user, this.state.subjectsSelected).then(data => {
                    console.log('data', data)
                    if(data && data.subjects) {
                        this.setState({
                            userSubjects: data.subjects,
                        });
                        window.location.reload();
                        window.location.reload();
                    }
                });
            }
    }



    render() {

        const { list } = this.state;

        return (
            <div>


                {this.state.redirectToHome ? (
                    <>
                        <h2 className="subheaderdos">Asignaturas guardadas con éxito</h2>

                        <Link to={'/home'}><button className={"mt-5"}> Entrar en la web </button></Link>
                    </>
                ) : (
                    <>
                        <Row className={'justify-content-center mt-5'}>
                            <Col xs={'12'} md={'12'} sm={'12'} lg={'12'} className={'logos'}>
                                <img src={UHU} alt={'logo uhu2'}/>
                            </Col>
                        </Row>
                        {this.props.user.type === 'alumn' ? (
                            <h2 className="mt-5 mb-5" style={{fontSize: '30px'}}>Selecciona las asignaturas de las que estés matriculado</h2>
                        ) : (
                                <h2 className="mt-5 mb-5" style={{fontSize: '30px'}}>Selecciona las asignaturas que estés impartiendo</h2>
                            )
                        }

                        {list && list.length > 0 &&
                            <>
                                <Row className={'justify-content-center'}>
                                    <Col xs={'12'} sm={'12'} md={'12'} lg={'12'}>
                                        {list.map(a => {
                                            return <div className={"mt-4"}>
                                                <Row className={'justify-content-initial mb-5'}>
                                                        <CustomInput
                                                            type="checkbox"
                                                            name=""
                                                            id={a._id}
                                                            value={a.title}
                                                            onChange={(e) => this.checkSelected(e.target.id)}
                                                            label={a.title}
                                                        />
                                                </Row>
                                            </div>
                                        })
                                        }
                                    </Col>
                                </Row>
                                <Row style={{textAlign: 'end'}}>
                                    <button className={"mt-5"} onClick={this.addSubjectsInUser}> Guardar asignaturas </button>
                                </Row>
                            </>
                        }
                    </>
                )
                }


            </div>

        );

    }



}

export default withAuth(SelectSubjects);
