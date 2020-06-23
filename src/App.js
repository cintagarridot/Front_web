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
import {Route} from 'react-router';

import 'assets/css/App.css';
import 'milligram';
import Chat from 'pages/Chat.js';
import NewsForm from 'components/NewsForm.js';
import NewsDetail from 'components/News/Details.js';

class App extends Component {
  render() {
    return (
      <Router>
     
        <AuthProvider>
          <div className="container">
            <Switch>
            <Route exact path="/" render={() => <Redirect from="/" to="/login"/> } />
              
              <AnonRoute path="/signup" component={Signup} />
              <AnonRoute path="/login" component={Login} />
              <PrivateRoute path="/home" component={Principal} />
              <PrivateRoute exact path="/news" component={NewsPage} />
              <PrivateRoute exact path="/news/create-news" component={NewsForm} />
              <PrivateRoute exact path="/news/detail/:id" component={NewsDetail} />
              <PrivateRoute path="/chat" component={Chat} />
              <PrivateRoute path="/user" component={User} />
          {/*}    <Redirect exact from="/" to="/login"/>*/}
         
            </Switch>
          </div>
        </AuthProvider>
      </Router>
    )
  }
}

export default App;
