import React, { Component } from 'react';

import withAuth from 'components/withAuth';
import Asignatura from 'components/Asignatura';
import Header from 'components/Header';

class MySubjects extends Component {

    render() {

        return (
            <div>
                <Header/>
                <Asignatura/>

            </div>

        );

    }

}
export default withAuth(MySubjects);
