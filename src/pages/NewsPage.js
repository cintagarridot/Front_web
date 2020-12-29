import React, { Component } from 'react';
import NewsList from '../components/News/List';
import withAuth from 'components/withAuth';
import Header from 'components/Header';
import { Col, Row, UncontrolledAlert } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';


class NewsPage extends Component {

    state = {
        create: false,
        deleted: false,
    }

    componentDidMount () {
        if(this.props.location.search === '?deleted=true'){
            this.setState({
                deleted:true,
            })
        }
    }

    createNews = () => {
        this.setState({
            create: !this.state.create
        })
    }

    render() {

        const { user } = this.props;

        return (
            <>
                <Header />

                <div className={'items-center'}>
                    {
                        this.state.deleted === true &&
                        <UncontrolledAlert color="success" fade={false} style={{ fontSize: '20px' }}>
                            La noticia se ha borrado correctamente
                        </UncontrolledAlert>
                    }


                    <Row>

                        {user.type !== 'alumn' ?
                            <>
                                <Col xs={'10'} sm={'10'} md={'10'} lg={'10'}>
                                    <h2 className="subheader">Noticias</h2>
                                </Col>
                                <Col xs={'2'} sm={'2'} md={'2'} lg={'2'}>
                                    <button className="buttonSearch" onClick={this.createNews}>
                                        Crear noticia
                                    </button>
                                </Col>
                            </>
                            : (
                                <Col xs={'12'} sm={'12'} md={'12'} lg={'12'}>
                                    <h2 className="subheader">Noticias</h2>
                                </Col>
                            )
                        }
                    </Row>
                    <NewsList props={this.props} />
                    <div className="clearfix"></div>


                </div>

                {this.state.create &&

                    <Redirect to='/news/create-news' />

                }

            </>



        );
    }


}

export default withAuth(NewsPage);
