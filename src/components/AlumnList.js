import React, { Component } from 'react';

import withAuth from 'components/withAuth';

import DataListView from 'components/DataListView';
import {Row, Col, Spinner} from 'reactstrap';
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
                {this.state.status !== 'success' &&
                    <Spinner color="info" />
                }
                {this.state.alumns && this.state.alumns.length > 0 && this.state.status === 'success'  && (
                    <>
                        <Row className="d-flex justify-content-center mb-1 mt-1">
                            <Col xs={'6'} sm={'6'} lg={'6'} xl={'6'}>
                                <p className="list-item-heading mb-1 truncate">
                                    NOMBRE
                                </p>
                            </Col>
                            <Col xs={'6'} sm={'6'} lg={'6'} xl={'6'}>
                                <p className="list-item-heading mb-1 truncate">
                                    USUARIO
                                </p>
                            </Col>
                        </Row>
                        {this.state.alumns.map(a => {
                            return <DataListView
                                key={a.id}
                                element={a}
                                onCheckItem={this.onCheckItem}
                                usersList   
                            />
                        })}
                    </>
                )}
                 {this.state.alumns && this.state.alumns.length === 0 && this.state.status === 'success' &&

                    <h2 className="text-center">No hay alumnos registrados</h2>

                }
            </div>

        );

    }

}

export default withAuth(AlumnList);