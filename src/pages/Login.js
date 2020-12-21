import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../components/withAuth';
import { Card, UncontrolledAlert } from 'reactstrap';

class Login extends Component {
  state = {
    username: '',
    password: '',
    dangerAlert: false,
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state
    console.log('props login', this.props);
    this.props.login({ username, password })
      .then((user) => {
        console.log(user)
        console.log('props login inside then', this.props);
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
          <UncontrolledAlert color="danger" className={'font'}>
            Usuario o contraseña incorrecta
          </UncontrolledAlert>
        }
        <Card style={{ background: '#fffdfd' }} className="auth-card">
          <form onSubmit={this.handleFormSubmit}>
            <label htmlFor='username' >Username</label>
            <input className={'mt-2 font'} required='true' id='username' type='text' name='username' value={username} onChange={this.handleChange} />
            <label className={'mt-2'} htmlFor='password'>Password</label>
            <input className={'mt-2 font'} required='true' id='password' type='password' name='password' value={password} onChange={this.handleChange} />
            <input className={'mt-4 button-color font'} type='submit' value='Iniciar sesión' />
          </form>

          <p className={'font'}>¿No tienes cuenta?
            <Link to={'/signup'} className={'link'}> Regístrate</Link>
          </p>

        </Card>

      </>
    )
  }
}

export default withAuth(Login);
