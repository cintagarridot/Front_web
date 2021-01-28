import React, { Component } from 'react';

import withAuth from 'components/withAuth';
import Asignatura from 'components/Asignatura';
import Header from 'components/Header';

class MySubjects extends Component {

    render() {

        return (
            <div className="mt-5">
                <Header/>
                <Asignatura/>

            </div>

        );

    }

}
export default withAuth(MySubjects);
