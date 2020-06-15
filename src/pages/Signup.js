import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../components/withAuth.js';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

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
        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor='firstName'>Nombre:</label>
          <input id='firstName' type='text' name='firstName' value={firstName} onChange={this.handleChange} />
          <label htmlFor='lastName'>Apellidos:</label>
          <input id='lastName' type='text' name='lastName' value={lastName} onChange={this.handleChange} />
          <label htmlFor='username'>Username:</label>
          <input id='username' type='text' name='username' value={username} onChange={this.handleChange} />
          <label htmlFor='password'>Password:</label>
          <input id='password' type='password' name='password' value={password} onChange={this.handleChange} />
          <input type='submit' value='Signup' />
        </form>

        <p>¿Ya tienes cuenta?
          <Link to={'/login'}>Login</Link>
        </p>

        {this.state.toHome &&

          <Redirect to='/home'/>

        }
      </>
    )
  }
}

export default withAuth(Signup);