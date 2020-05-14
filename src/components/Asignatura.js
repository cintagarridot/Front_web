import React, { Component } from 'react';
import axios from 'axios';

class Asignatura extends Component {

    state = {

        subjects: {},
        status: null

    }

    componentWillMount() {
        this.getSubjects();
    }

    getSubjects = () => {
        //peticion ajax
        axios.get("http://localhost:3800/subjects/") //url a la que le vamos a hacer una peticion por get a la API REST
            .then(res => {
                console.log(res.data);
                this.setState({
                    subjects: res.data.subjects,
                    status: 'success'
                });
            });
    }
    render() {


        return (

            <section id="content" >

                {this.state.status === 'success' &&

                    <div>
                        <h2 className="subheaderdos">Asignaturas</h2>
                        {this.state.subjects.map((subject, i) => {
                            return (
                                <h1 key={subject._id}>{subject.title}</h1>
                            );
                        })
                        }
                    </div>

                }



            </section>


        );


    }



}

export default Asignatura;