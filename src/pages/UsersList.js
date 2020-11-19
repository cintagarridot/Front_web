import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from 'react-router-dom';

import withAuth from 'components/withAuth';
import Asignatura from 'components/Asignatura';
import Header from 'components/Header';
import DataListView from 'components/DataListView';
import axios from 'axios';
import {Row, Col} from 'reactstrap';
import userService from 'services/user-service';
import TeacherList from 'components/TeacherList';
import AlumnList from 'components/AlumnList';

import "react-tabs/style/react-tabs.css";

class UsersList extends Component {

    state = {
        users: [Object],
        status: null,
    }

  
    onCheckItem = (event, id) => {     
        document.activeElement.blur();
    };

   
    render() {

        return (
            <div>
                <Header />
                           
                <div id="user">
                    <Row className="pt-5 mt-5">
                        <Col xs='10'>
                            <h2 className="subheaderdos">Usuarios</h2>
                        </Col>
                        <Col xs='2' className="pt-5 mt-5">
                            <Link to={'/add-teacher'} className={'btn btn-primary'} >Añadir profesor</Link>
                        </Col>
                    </Row>

                    <Tabs>
                        <TabList>
                            <Tab selectedClassName="selected-tab-style">
                                Alumnos
                            </Tab>
                            <Tab
                                selectedClassName="selected-tab-style"
                            >
                                Profesores
                            </Tab>
                        </TabList>
                 

                        <TabPanel>
                            <AlumnList/>
                        </TabPanel>
                    
                        <TabPanel>
                            <TeacherList/>
                        </TabPanel>
                  </Tabs>
</div>
            </div>

        );

    }

}

export default withAuth(UsersList);