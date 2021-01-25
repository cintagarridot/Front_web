import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import withAuth from '../components/withAuth.js';
import axios from 'axios';
import { Card, Col, Row, Alert, UncontrolledAlert } from 'reactstrap';
import Recaptcha from 'react-recaptcha';

class Signup extends Component {

  state = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    toHome: false,
    alert: '',
    isVerified: false,
    alertNotVerified: false,
  };


  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    console.log('this.state.isVerfied', this.state.isVerified);

    //axios.post("http://localhost:3800/auth/signup", { firstName, lastName, username, password })
    if(this.state.isVerified) {
      this.props.signup({ firstName, lastName, username, password })
          .then((user) => {
            console.log('user signup', user);
            this.setState({
              username: '',
              password: '',
              firstName: '',
              lastName: '',
              toHome: true,
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
    } else {
      this.setState({
        alertNotVerified: true
      })
    }

  }

  verifyCallback (response) {
    if(response){
      console.log('response,', response);
      this.setState({
        isVerified: true
      });
    }

  }

  recaptchaLoaded = () => {
    console.log('captcha loaded successfully')
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
            No se ha podido registrar. Ya existe un usuario con ese username.
          </UncontrolledAlert>
        }
        {
          this.state.alertNotVerified &&
          <UncontrolledAlert color={'danger'} className={'font'}>
            No se ha podido registrar. Compruebe que todos los campos están marcados y completos.
          </UncontrolledAlert>
        }
        <Card style={{ background: '#fffdfd' }} className="auth-card-signup">
          <form onSubmit={this.handleFormSubmit}>
            <Row className={''}>
              <Col xs={'12'}>
                <label htmlFor='firstName'>Nombre</label>
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

            <Row className={'justify-content-center mt-4'}>
              <Col xs={'12'}>
                <Recaptcha
                    sitekey="6Ldq6zsaAAAAABV8w2e-er3kbGCSFHvAfgOPGQCF"
                    render="explicit"
                    verifyCallback={this.verifyCallback}
                    onloadCallback={this.recaptchaLoaded}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={'12'}>
                <input className={'mt-4'} type='submit' value='Registrar' />
              </Col>
            </Row>

          </form>

          <p className={'font'}>¿Ya tienes cuenta?
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
