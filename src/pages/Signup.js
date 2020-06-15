import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import withAuth from '../components/withAuth.js';
import axios from 'axios';
import { Card, Col, Row, Alert } from 'reactstrap';

class Signup extends Component {

  state = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    toHome: false,
  };


  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;

    axios.post("http://localhost:3800/users/signup", { firstName, lastName, username, password })
      .then((user) => {

        this.setState({
          username: '',
          password: '',
          firstName: '',
          lastName: '',
          toHome: true,
        });


      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { username, password, firstName, lastName } = this.state;
    return (
      <>
        <Card style={{ background: '#fffdfd' }} className="auth-card-signup">
          <form onSubmit={this.handleFormSubmit}>
            <Row className={''}>
              <Col xs={'12'}>
                <label htmlFor='firstName'>Nombre</label>
              </Col>
              <Col xs={'12'} >
                <input className={'mt-2'} id='firstName' required='true' type='text' name='firstName' value={firstName} onChange={this.handleChange} />
              </Col>
            </Row>

            <Row>
              <Col xs={'12'}>
                <label className={'mt-2'} htmlFor='lastName'>Apellidos</label>
              </Col>
              <Col xs={'12'}>
                <input className={'mt-2'} id='lastName' required='true' type='text' name='lastName' value={lastName} onChange={this.handleChange} />
              </Col>

              <Col xs={'12'}>
                <label className={'mt-2'} htmlFor='username'>Username</label>
              </Col>
              <Col xs={'12'}>
                <input className={'mt-2'} id='username' required='true' type='text' name='username' value={username} onChange={this.handleChange} />
              </Col>
            </Row>

            <Row>
              <Col xs={'12'}>
                <label className={'mt-2'} htmlFor='password'>Password</label>
              </Col>
              <Col xs={'12'}>
                <input className={'mt-2'} id='password' required='true' type='password' name='password' value={password} onChange={this.handleChange} />
              </Col>
            </Row>

            <Row>
              <Col xs={'12'}>
                <input className={'mt-4'} type='submit' value='Signup' />
              </Col>
            </Row>

          </form>

          <p style={{ fontSize: '12px' }}>¿Ya tienes cuenta?
          <Link to={'/login'} className={'link'}> Entra aquí</Link>
          </p>
        </Card>
        {this.state.toHome &&

          <Redirect to='/home' />

        }
      </>
    )
  }
}

export default withAuth(Signup);