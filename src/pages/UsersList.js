import React, { Component } from 'react';


//import Asignatura from './Asignatura';

/*import Slider from './Slider';
import Header from './Header';*/

import withAuth from 'components/withAuth';
import Asignatura from 'components/Asignatura';
import Header from 'components/Header';
import Slider from 'components/Slider';
import DataListView from 'components/DataListView';
import axios from 'axios';


class UsersList extends Component {

    state = {

        users: [Object],
        status: null,
    }

    componentDidMount() {
        //sthis.getSubjects();       
       this.getUsersList();
    }

    onCheckItem = (event, id) => {     
        document.activeElement.blur();
     };

    getUsersList = async() => {
        await axios.get('http://localhost:3800/users/')
        .then(res => {
            console.log(res.data);
            this.setState({
                users: res.data.usuarios,
                status: 'success'
            });
        });
    }

    render() {

        return (
            <div>
                <Header />
                           
                {this.state.users.map(u => {
                     return (
                        <DataListView
                        key={u.id}
                        element={u}
                        onCheckItem={this.onCheckItem}
                        usersList
                        />
                     )
                })}

            </div>

        );

    }

}

export default withAuth(UsersList);