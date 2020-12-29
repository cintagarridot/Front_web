import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import withAuth from '../components/withAuth.js';
import axios from 'axios';
import { Card, Col, Row, Alert, UncontrolledAlert } from 'reactstrap';
import userService from 'services/user-service.js';

class AddTeacher extends Component {

  state = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    toUserList: false,
    alert: '',
  };


  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;

    const newTeacher = axios.create({
        baseURL: 'https://uhu-back.herokuapp.com',
        withCredentials: true, //poner siempre, es el que controla la cookie del header en una petición y es lo que lee el back para saber si tiene current user
    })
    newTeacher.post("/users/add-teacher", {username, password, firstName, lastName})
      .then(data => {
        console.log(data)
        this.setState({
          username: '',
          password: '',
          firstName: '',
          lastName: '',
          toUserList: true,
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
    const { username, password, firstName, lastName } = this.state;
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
                    <h2 className={'text-center mt-5'}>Nuevo profesor</h2>
                </Col>

                </Row>
                <Row className={''}>
                <Col xs={'12'}>
                    <label htmlFor='firstName' className={'mt-4'}>Nombre</label>
                </Col>
                <Col xs={'12'} >
                    <input className={'mt-2 font'} id='firstName' required='true' type='text' name='firstName' value={firstName} onChange={this.handleChange} />
                </Col>
                </Row>

                <Row>
                <Col xs={'12'}>
                    <label className={'mt-2'} htmlFor='lastName'>Apellidos</label>
                </Col>
                <Col xs={'12'}>
                    <input className={'mt-2 font'} id='lastName' required='true' type='text' name='lastName' value={lastName} onChange={this.handleChange} />
                </Col>

                <Col xs={'12'}>
                    <label className={'mt-2'} htmlFor='username'>Username</label>
                </Col>
                <Col xs={'12'}>
                    <input className={'mt-2 font'} id='username' required='true' type='text' name='username' value={username} onChange={this.handleChange} />
                </Col>
                </Row>

                <Row>
                <Col xs={'12'}>
                    <label className={'mt-2'} htmlFor='password'>Contraseña</label>
                </Col>
                <Col xs={'12'}>
                    <input className={'mt-2 font'} id='password' required='true' type='password' name='password' value={password} onChange={this.handleChange} />
                </Col>
                </Row>

                <Row className={'text-center'}>
                <Col xs={'2'} className={'mt-5 pt-3 goBackButtonTeacher'} >

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
        {this.state.toUserList &&

          <Redirect to='/users-list' />

        }
      </>
    )
  }
}

export default withAuth(AddTeacher);
