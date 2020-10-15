import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import withAuth from '../withAuth';

const AnonRoute = (props) => {
  const {user, isLoggedIn, component: Component, ...rest} = props;

  return (
    <>
      {!isLoggedIn ? <Route 
        render={(props) => {
          return <Component {...props}/>
        }}
        {...rest}
      />
      : isLoggedIn && user.type === 'admin' ? (
          <Redirect to='/user'/>
      ) : <Redirect to='/home' />}
    </>

     
  );
}

export default withAuth(AnonRoute);
