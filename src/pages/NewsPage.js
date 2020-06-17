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
                    <h2 className="subheader">Noticias</h2>

                    <Row className={'pt-4 mb-5 ml-1'}>
                        <Col xs={'6'}>
                            <input className="searchNews" type="text" style={{ fontSize: '12px' }} placeholder="Buscar noticia..." />
                        </Col>

                        <Col xs={'0.5'}>
                            <button className="buttonSearch" >Buscar</button>
                        </Col>

                        <Col xs={'1'}>
                            <button className="buttonSearch" onClick={this.createNews}>
                                Crear noticia
                            </button>
                        </Col>
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