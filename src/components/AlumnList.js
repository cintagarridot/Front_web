import React, { Component } from 'react';

import withAuth from 'components/withAuth';

import DataListView from 'components/DataListView';
import {Row, Col} from 'reactstrap';
import userService from 'services/user-service';


class AlumnList extends Component {

    state = {

        alumns: [],
        status: null,
    }

    componentDidMount() {
        this.getAlumnList();
    }

    onCheckItem = (event, id) => {     
        document.activeElement.blur();
     };

     getAlumnList = async() => {
        await userService.getAlumnsList()
        .then(res => {
            console.log(res.data);
            this.setState({
                alumns: res.alumns,
                status: 'success'
            });
        });
    }

    render() {
        return (
            <div>  
                {this.state.alumns && this.state.alumns.length > 0 && this.state.alumns.map(a => {
                     return (
                        <DataListView
                            key={a.id}
                            element={a}
                            onCheckItem={this.onCheckItem}
                            usersList   
                        />
                     )
                })}
            </div>

        );

    }

}

export default withAuth(AlumnList);