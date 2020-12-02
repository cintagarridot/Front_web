import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Redirect, HashRouter} from 'react-router-dom';

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
import SubjectsList from 'pages/SubjectsList.js';
import AddSubject from 'pages/AddSubject.js';
import withAuth from 'components/withAuth';
import AdminRoute from 'components/routes/AdminRoute.js';
import DocumentsRoute from 'components/routes/DocumentsRoute.js';
import DocumentsList from 'pages/DocumentsList.js';
import AddDocument from 'pages/AddDocument.js';
import ShowDocument from 'pages/ShowDocument.js';
import AddSubjectGuideRequest from 'pages/AddSubjectGuideRequest.js';

class App extends Component {
  render() {

    return (
      <Router>

        <AuthProvider>
        {console.log('props dep app')}

          {console.log(this.props)}
          {console.log('hola soy app')}
          <div className="container">
            <HashRouter basename={'/login'}>
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
                <PrivateRoute path="/subject/details/:id" component={SubjectDetails} />
                <AdminRoute path="/users-list" component={UsersList} />
                <AdminRoute path="/add-teacher" component={AddTeacher} />
                <AdminRoute path="/subjects-list" component={SubjectsList} />
                <AdminRoute path="/add-subject" component={AddSubject} />
                <DocumentsRoute path="/documents" component={DocumentsList} />
                <DocumentsRoute exact path="/generate-pdf" component={AddDocument} />
                <DocumentsRoute exact path="/generate-subject-guide-request" component={AddSubjectGuideRequest} />
                <DocumentsRoute exact path="/pdf" component={ShowDocument} />
                <Route exact path="/select-subjects" component={SelectSubjects} />

              </Switch>
            </HashRouter>
          </div>
        </AuthProvider>
      </Router>
    )
  }
}

export default App;
