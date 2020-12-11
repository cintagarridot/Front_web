import React, { Component } from 'react';

import Table from 'components/Table';
import axios from 'axios';
import Slider from 'components/Slider';
import DataListView from '../DataListView';
import newsService from 'services/news-service';
import loading from 'assets/images/loading.jpg';


class NewsList extends Component {

    state = {
        news: [],
        byId: {},
        searchById: false,
        updated: false,
        deleted: false,
        status: null,
    }

    componentDidMount() {

       this.getNewsList();

    }

    getNewsList = async() => {

        const news = axios.create({
            baseURL: 'http://localhost:3800/news',
            withCredentials: true, //poner siempre, es el que controla la cookie del header en una petición y es lo que lee el back para saber si tiene current user
          })
        news.get("/").then(({data}) => {
            this.setState({
                news: data.noticias,
                status: 'success'
            })
        })

    }


    onCheckItem  = (event, id) => {
        document.activeElement.blur();
    }


    render() {

        return (

            <section id="content" >

                {this.state.status !== 'success' ? (
                    /*<div className={'loading'}>
                        <img src={loading} />
                    </div>*/
                    <div>
                        <h2>Cargando...</h2>
                    </div>
                ) : (
                        !this.state.searchById && this.state.news.length > 0 ?

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
