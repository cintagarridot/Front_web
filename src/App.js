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
import UsersList from 'pages/UsersList.js';
import ListChats from 'pages/ListChats';
import SelectSubjects from 'pages/SelectSubjects';
import SubjectDetails from 'components/Subjects/Details.js';
import AddTeacher from 'pages/AddTeacher.js';
import withAuth from 'components/withAuth';
import AdminRoute from 'components/routes/AdminRoute.js';


class App extends Component {
  render() {
    
    return (
      <Router>
     
        <AuthProvider>
        {console.log('props dep app')}

          {console.log(this.props)}
          <div className="container">
            <Switch>
              <Route exact path="/" render={() => <Redirect from="/" to="/login"/> } />
              
              <AnonRoute path="/signup" component={Signup} />
              <AnonRoute path="/login" component={Login} />
              <PrivateRoute path="/home" component={Principal} />
              <PrivateRoute exact path="/news" component={NewsPage} />
              <PrivateRoute exact path="/news/create-news" component={NewsForm} />
              <PrivateRoute exact path="/news/detail/:id" component={NewsDetail} />
              <PrivateRoute path="/chat/:id" component={Chat} />
              <PrivateRoute path="/chat" component={ListChats} />
              <PrivateRoute path="/user" component={User} />
              <PrivateRoute path="/users-list" component={UsersList} />
              <PrivateRoute path="/subject/details/:id" component={SubjectDetails} />
              <AdminRoute path="/add-teacher" component={AddTeacher} />
              <Route exact path="/select-subjects" component={SelectSubjects} />
            </Switch>
          </div>
        </AuthProvider>
      </Router>
    )
  }
}

export default App;
