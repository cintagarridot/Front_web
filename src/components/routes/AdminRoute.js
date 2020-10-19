import React, { useEffect, useState } from 'react';
import {Route, Redirect} from 'react-router-dom';
import withAuth from 'components/withAuth';
import SelectSubjects from 'pages/SelectSubjects';
import subjectService from 'services/subject-service';

const AdminRoute = (props) => {

  const {isLoggedIn, user, component: Component, ...rest} = props;
  return (
    <>
      {isLoggedIn && user.type === 'admin' ? ( <Route 
        render={(props) => {
          return <Component {...props}/>
        }}
        {...rest}
      />
      ) : ( 
            <Redirect to='/home' />
        ) 
      }
    </>

   
  );
}

export default withAuth(AdminRoute);
