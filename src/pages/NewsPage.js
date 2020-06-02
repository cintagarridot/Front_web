import React, { Component } from 'react';
import SideBar from 'components/SideBar';

import News from 'components/News';
import withAuth from 'components/withAuth';
import Header from 'components/Header';
import { Col, Row } from 'reactstrap';

class NewsPage extends Component {



    render() {

        return (
            <>
                <Header />
                {/*} <div className="center">*/}


                <div className={'items-center'}>

                    <h2 className="subheader">Noticias</h2>

                    <Row className={'mb-5 ml-1'}>
                        <Col xs={'6'}>
                            <input className="searchNews" type="text" placeholder="Buscar noticia..." />
                        </Col>

                        <Col xs={'0.5'}>
                            <button className="buttonSearch">Buscar</button>
                        </Col>

                        <Col xs={'1'}>
                            <button className="buttonSearch">Añadir noticia</button>
                        </Col>
                    </Row>
                    <News />
                    <div className="clearfix"></div>

                </div>

                {/*}  </div >*/}

            </>



        );
    }


}

export default withAuth(NewsPage);