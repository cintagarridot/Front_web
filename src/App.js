import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';

import Navbar from './components/Navbar.js';
import PrivateRoute from './components/routes/PrivateRoute.js';
import AnonRoute from './components/routes/AnonRoute.js';

import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';

import AuthProvider from './contexts/auth-context.js';
import Principal from 'pages/Principal.js';
import NewsPage from 'pages/NewsPage.js';
import User from 'pages/User';

import 'assets/css/App.css';
import 'milligram';
import Chat from 'pages/Chat.js';

class App extends Component {
  render() {
    return (
      <Router>
     
        <AuthProvider>
          <div className="container">
            <Switch>
              <AnonRoute path="/signup" component={Signup} />
              <AnonRoute path="/login" component={Login} />
              {/*<PrivateRoute path="/" render={() => <Redirect from="/" to="/home"/> } />*/}
              <PrivateRoute path="/home" component={Principal} />
              <PrivateRoute path="/news" component={NewsPage} />
              <PrivateRoute path="/chat" component={Chat} />
              <PrivateRoute path="/user" component={User} />
            </Switch>
          </div>
        </AuthProvider>
      </Router>
    )
  }
}

export default App;
