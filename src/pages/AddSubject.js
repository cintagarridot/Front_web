import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import withAuth from '../components/withAuth.js';
import axios from 'axios';
import { Card, Col, Row, Alert, UncontrolledAlert } from 'reactstrap';
import Select from 'react-select';
import { Field } from 'formik';

class AddSubject extends Component {

  state = {
    title: '',
    content: '',
    creditos: '',
    curso: '',
    toUserSubjectList: false,
    alert: '',
  };


  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const content = this.state.content;
    const creditos = this.state.creditos;
    const curso = this.state.curso;

    const newSubject = axios.create({
        baseURL: 'https://uhu-back.herokuapp.com',
        withCredentials: true, //poner siempre, es el que controla la cookie del header en una petición y es lo que lee el back para saber si tiene current user
    })
    newSubject.post("/subjects/", {title, content, creditos, curso})
      .then(data => {
        console.log(data)
        this.setState({
          title: '',
          content: '',
          creditos: '',
          curso: '',
          toUserSubjectList: true,
        });


      })
      .catch(error => {
        if (error.message === 'Request failed with status code 422') {
          this.setState({
            alert: 'danger'
          })
        }
      }
      )
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { title, content, creditos, curso } = this.state;
    return (
      <>
        {
          this.state.alert === 'danger' &&
          <UncontrolledAlert color={'danger'} className={'font'}>
            No se ha podido crear. Ya existe un usuario con ese username.
          </UncontrolledAlert>
        }
        <Card style={{ background: '#fffdfd' }} className="auth-card-signup">
            <form onSubmit={this.handleFormSubmit}>

            <Row className={''}>

                <Col xs={'12'}>
                    <h2 className={'text-center mt-5'}>Nueva asignatura</h2>
                </Col>

                </Row>
                <Row className={''}>
                <Col xs={'12'}>
                    <label htmlFor='title' className={'mt-4'}>Título</label>
                </Col>
                <Col xs={'12'} >
                    <input className={'mt-2 font'} id='title' required='true' type='text' name='title' value={title} onChange={this.handleChange} />
                </Col>
                </Row>

                <Row>
                <Col xs={'12'}>
                    <label className={'mt-2'} htmlFor='content'>Contenido</label>
                </Col>
                <Col xs={'12'}>
                    <textarea className={'mt-2 font'} required='true' name='content' value={content} onChange={this.handleChange} />
                </Col>

                <Col xs={'12'}>
                    <label className={'mt-2'} htmlFor='creditos'>Creditos</label>
                </Col>
                <Col xs={'12'}>
                <select value={creditos} placeholder={'Seleccionar creditos'} onChange={this.handleChange} name='creditos'>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                </Col>
                </Row>

                <Row>
                <Col xs={'12'}>
                    <label className={'mt-2'} htmlFor='curso'>Curso</label>
                </Col>
                <Col xs={'12'}>
                    <select value={curso} placeholder={'Seleccionar curso'} onChange={this.handleChange} name='curso'>
                      <option value="1º">1º</option>
                      <option value="2º">2º</option>
                      <option value="3º">3º</option>
                      <option value="4º">4º</option>
                    </select>
                </Col>
                </Row>

                <Row className={'justify-content-center'}>
                <Col xs={'1.5'} className={'mt-5 pt-3 goBackButtonTeacher'} >

                    <a href="javascript:history.back()">
                        Volver
                    </a>

                    </Col>
                <Col xs={'1'} >
                    <input className={'mt-5'} type='submit' value='Añadir' />
                </Col>
                </Row>

            </form>

        </Card>
        {this.state.toUserSubjectList &&

          <Redirect to='/subjects-list' />

        }
      </>
    )
  }
}

export default withAuth(AddSubject);
