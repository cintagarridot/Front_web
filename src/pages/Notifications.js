import React, { Component } from 'react';
import withAuth from 'components/withAuth';
import Header from 'components/Header';
import { Col, Row } from 'reactstrap';
import DataListView from "../components/DataListView";


class Notifications extends Component {

    componentDidMount () {

    }

    render() {

        const { user } = this.props;
        console.log('user notifications', user.notifications);
        return (
            <>
                <Header />

                <Row>
                    <Col xs={'6'} sm={'8'} md={'12'} lg={'12'} xl={'12'}>
                        <h2 className="subheader" style={{marginTop: '20px'}}>Notificaciones</h2>
                    </Col>
                </Row>

                <Row>
                    <Col xs={'6'} sm={'8'} md={'12'} lg={'12'} xl={'12'}>
                        {user.notifications.map((notification) => {
                            return <DataListView
                                key={notification._id}
                                element={notification}
                                notifications
                            />
                        })}

                    </Col>

                </Row>

                <div className="clearfix"></div>

            </>
        );
    }

}

export default withAuth(Notifications);
