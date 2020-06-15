import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../components/withAuth';
import { Card, Alert } from 'reactstrap';

class Login extends Component {
  state = {
    username: '',
    password: '',
    dangerAlert: false,
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state

    this.props.login({ username, password })
      .then((user) => {
        console.log(user)
      })
      .catch(error =>
        this.setState({
          dangerAlert: true,
        })
      )
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { username, password } = this.state;
    return (
      <>

        {
          this.state.dangerAlert &&
          <Alert color="danger">
            Usuario o contraseña incorrecta
          </Alert>
        }
        <Card style={{ background: '#fffdfd' }} className="auth-card">
          <form onSubmit={this.handleFormSubmit}>
            <label htmlFor='username' >Username:</label>
            <input className={'mt-2'} id='username' type='text' name='username' value={username} onChange={this.handleChange} />
            <label className={'mt-2'} htmlFor='password'>Password:</label>
            <input className={'mt-2'} id='password' type='password' name='password' value={password} onChange={this.handleChange} />
            <input className={'mt-4 button-color'} type='submit' value='Login' />
          </form>

          <p style={{ fontSize: '12px' }}>¿No tienes cuenta?
            <Link to={'/signup'} className={'link'}> Signup</Link>
          </p>

        </Card>


      </>
    )
  }
}

export default withAuth(Login);