import React, { Component } from 'react';

import withAuth from 'components/withAuth';

import Header from 'components/Header';
import DataListView from 'components/DataListView';
import {Row, Col, Spinner} from 'reactstrap';
import userService from 'services/user-service';


class TeacherList extends Component {

    state = {

        teachers: [],
        status: null,
    }

    componentDidMount() {
       this.getTeacherList();
    }

    onCheckItem = (event, id) => {     
        document.activeElement.blur();
     };

     getTeacherList = async() => {
        await userService.getTeachersList()
        .then(res => {
            console.log(res.data);
            this.setState({
                teachers: res.teachers,
                status: 'success'
            });
        });
    }

    render() {
        return (
            <div>  
                {this.state.status !== 'success' &&
                    <Spinner color="info" />
                }
                {this.state.teachers && this.state.teachers.length > 0 && this.state.status === 'success' && this.state.teachers.map(t => {
                     return (
                        <DataListView
                            key={t.id}
                            element={t}
                            onCheckItem={this.onCheckItem}
                            usersList   
                        />
                     )
                })}
                {this.state.teachers && this.state.teachers.length === 0 && this.state.status === 'success' &&

                    <h2 className="text-center">No hay profesores registrados</h2>

                }
            </div>

        );

    }

}

export default withAuth(TeacherList);