import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';

import subjectService from '../services/subject-service';
import userService from '../services/user-service';

import withAuth from 'components/withAuth';
import { CustomInput } from 'reactstrap';

class SelectSubjects extends Component {


        state = {
            list: [],
            subjectsSelected: [],
            userSubjects: this.props.user.subjects,
            redirectToHome: false,
        }


    componentDidMount() {
        if(this.state.userSubjects.length > 0){
            return <Redirect to={'/home'}/>
        }
        subjectService.getSubjects().then(data => {
            console.log('data list subject', data)
            this.setState({
                list: data.subjects
            })
        });

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
            console.log('prevState', prevState.userSubjects)
            console.log('actualState', this.state.userSubjects)
            console.log('componentDidUpdate condition', prevState.userSubjects !== this.state.userSubjects)
            if(prevState.userSubjects !== this.state.userSubjects){
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

                        console.log('desp del this.setState', this.state.userSubjects)
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
                <h2 className="subheaderdos">Selecciona las asignaturas de las que estés matriculado</h2>

                {list && list.length > 0 &&
                    <>
                       { list.map(a => {
                            return <div className={"mt-4"}>
                            <CustomInput
                                type="checkbox"
                                name=""
                                id={a._id}
                                value={a.title}
                                onChange={(e) => this.checkSelected(e.target.id)}
                                label={a.title}
                            />
                            </div>
                        })
                        }

                       <Link to={'/home'}><button className={"mt-5"} onClick={this.addSubjectsInUser}> Guardar asignaturas </button> </Link>
                    </>
                }

            </div>

        );

    }



}

export default withAuth(SelectSubjects);
