import React, { Component } from 'react';

import withAuth from 'components/withAuth';

import Header from 'components/Header';
import DataListView from 'components/DataListView';
import {Row, Col} from 'reactstrap';
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
        await userService.getTeacherList()
        .then(res => {
            console.log(res.data);
            this.setState({
                teachers: res.teachers,
                status: 'success'
            });
        });
    }

    render() {
console.log('prof')
        return (
            <div>  
                {this.state.teachers && this.state.teachers.length > 0 && this.state.teachers.map(t => {
                     return (
                        <DataListView
                            key={t.id}
                            element={t}
                            onCheckItem={this.onCheckItem}
                            usersList   
                        />
                     )
                })}
            </div>

        );

    }

}

export default withAuth(TeacherList);