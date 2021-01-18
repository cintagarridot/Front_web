import React, { useEffect, useState } from 'react';
import {Route, Redirect} from 'react-router-dom';
import withAuth from 'components/withAuth';
import SelectSubjects from 'pages/SelectSubjects';
import subjectService from 'services/subject-service';

const PrivateRoute = (props) => {

  const {isLoggedIn, user, component: Component, ...rest} = props;

  return (
    <>
      {(isLoggedIn && user.subjects.length > 0 || isLoggedIn && user.type === 'admin') ? ( <Route
        render={(props) => {
          return <Component {...props}/>
        }}
        {...rest}
      /> ) : isLoggedIn && user.subjects.length === 0  ? (
              <Redirect to='/select-subjects' />
      ) : (
            <Redirect to='/login' />
        )
      }
    </>


  );
}

export default withAuth(PrivateRoute);
