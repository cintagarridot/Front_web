import React, { Component } from 'react';

import Table from 'components/Table';
import axios from 'axios';
import Slider from 'components/Slider';
import DataListView from '../DataListView';
import newsService from 'services/news-service';
import { Spinner } from 'reactstrap';

class NewsList extends Component {

    state = {
        actualNews: [],
        byId: {},
        updated: false,
        deleted: false,
    }

    componentDidMount() {

       this.setState({
           actualNews: this.props.news,
       })

    }

    componentDidUpdate(prevProps, prevState) {
        console.log('prevProps', prevProps);
        console.log('prevState', prevState);
        if(prevProps.news.length !== this.props.news.length){
            console.log('entra en el component did update de news');
            this.setState({
                actualNews: this.props.news
            });
        }
    }



    onCheckItem  = (event, id) => {
        document.activeElement.blur();
    }


    render() {

        return (

            <section id="content" >

                {this.props.status !== 'success' ? (
                    <div>
                        <Spinner color="info" />
                        {/*<h2>Cargando...</h2>*/}
                    </div>
                ) : (
                        this.state.actualNews.length > 0 ?

                            this.state.news.map(n => {
                                return (
                                  <DataListView
                                        key={n._id}
                                        element={n}
                                        news
                                        onCheckItem={this.onCheckItem}
                                    />
                                );
                            })

                            : (
                                <h2 className="text-center">No hay noticias</h2>
                            )


                )

                }


            </section>

        );

    }

}

export default NewsList;
