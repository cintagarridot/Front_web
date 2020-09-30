import React, { Component } from 'react';


//import Asignatura from './Asignatura';

/*import Slider from './Slider';
import Header from './Header';*/

import withAuth from 'components/withAuth';
import Asignatura from 'components/Asignatura';
import Header from 'components/Header';
import DataListView from 'components/DataListView';
import axios from 'axios';
import {Row, Col} from 'reactstrap';
import userService from 'services/user-service';

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
        await userService.getUserList()
        .then(res => {
            console.log(res.data);
            this.setState({
                users: res.usuarios,
                status: 'success'
            });
        });
    }

    render() {

        return (
            <div>
                <Header />
                           
                <div id="user">
                    <Row className="pt-5 mt-5">
                        <Col xs='11'>
                            <h2 className="subheaderdos">Usuarios</h2>
                        </Col>
                        <Col xs='1' className=" pt-5 mt-5">
                            <button>Añadir usuario</button>
                        </Col>
                    </Row>
               
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
            </div>

        );

    }

}

export default withAuth(UsersList);