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
import Notifications from 'pages/Notifications.js';
import CreateAnexoII from "./components/CreateAnexoII";
import CreateAnexoV from "./components/CreateAnexoV";
import AskForACourt from "./components/AskForACourt";
import AskForCorrection from "./components/AskForCorrection";
import AppointmentWithDirector from "./components/AppointmentWithDirector";
import ComplaintToATeacher from "./components/ComplaintToATeacher";
import SelectSubjectRoute from "./components/routes/SelectSubjectRoute";
import MySubjects from "./components/Subjects/MySubjects";

class App extends Component {
  render() {

    return (
      <Router>

        <AuthProvider>
        {console.log('props dep app')}

          {console.log(this.props)}
          <div className="container">
            <HashRouter basename={'/'}>
              <Switch>
                <Route exact path="/" render={() => <Redirect from="/" to="/login"/> } />

                <AnonRoute path="/signup" component={Signup} />
                <AnonRoute path="/login" component={Login} />
                <PrivateRoute path="/home" component={Principal} />
                <PrivateRoute path="/my-subjects" component={MySubjects} />
                <PrivateRoute exact path="/news" component={NewsPage} />
                <PrivateRoute exact path="/news/create-news" component={NewsForm} />
                <PrivateRoute exact path="/news/detail/:id" component={NewsDetail} />
                <PrivateRoute path="/chat/:id" component={Chat} />
                <PrivateRoute path="/chat" component={ListChats} />
                <PrivateRoute path="/user" component={User} />
                <PrivateRoute path="/subject/details/:id" component={SubjectDetails} />
                <PrivateRoute exact path="/notifications" component={Notifications} />
                <AdminRoute path="/users-list" component={UsersList} />
                <AdminRoute path="/add-teacher" component={AddTeacher} />
                <AdminRoute path="/subjects-list" component={SubjectsList} />
                <AdminRoute path="/add-subject" component={AddSubject} />
                <DocumentsRoute path="/documents" component={DocumentsList} />
                <DocumentsRoute exact path="/generate-pdf" component={AddDocument} />
                <DocumentsRoute exact path="/generate-subject-guide-request" component={AddSubjectGuideRequest} />
                <DocumentsRoute exact path="/generate-anexo-II" component={CreateAnexoII} />
                <DocumentsRoute exact path="/generate-anexo-V" component={CreateAnexoV} />
                <DocumentsRoute exact path="/generate-correction" component={AskForCorrection} />
                <DocumentsRoute exact path="/appointment-director" component={AppointmentWithDirector} />
                <DocumentsRoute exact path="/court" component={AskForACourt} />
                <DocumentsRoute exact path="/complaint-a-teacher" component={ComplaintToATeacher} />
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
