import React, { useEffect, useState } from 'react';
import {Route, Redirect} from 'react-router-dom';
import withAuth from 'components/withAuth';
import SelectSubjects from 'pages/SelectSubjects';
import subjectService from 'services/subject-service';

const SelectSubjectRoute = (props) => {

    const {isLoggedIn, user, component: Component, ...rest} = props;

    return (
        <>
            { user.subjects.length > 0 ? (
                    <Redirect to='/home' />
               ) : (
                    <Redirect to='/select-subjects' />
                )
            }
        </>


    );
}

export default withAuth(SelectSubjectRoute);
