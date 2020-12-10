import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

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

        subjectService.getSubjects().then(data => {
            console.log('data list subject', data)
            this.setState({
                list: data.subjects
            })
        })

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

    addSubjectsInUser = () => {
        userService.addSubjectsInUser(this.props.user, this.state.subjectsSelected).then(data => {
            if(data && data.subjects.length > 0){
                this.setState({
                    userSubjects: data.subjects,
                })
            }


        });

    }



    render() {

        const { list, redirectToHome } = this.state;

        return (
            <div>
                <h2 className="subheaderdos">Listado de asignaturas para escoger</h2>

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

                        <a href={'/Front_web/#/home'}> <button className={"mt-5"} onClick={this.addSubjectsInUser}> Guardar asignaturas </button></a>
                    </>
                }

            </div>

        );

    }



}

export default withAuth(SelectSubjects);
