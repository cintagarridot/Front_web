import React, { Component } from 'react';

import Table from 'components/Table';
import axios from 'axios';
import Slider from 'components/Slider';
import DataListView from '../DataListView';

class NewsList extends Component {

    state = {
        news: {},
        byId: {},
        searchById: false,
        updated: false,
        deleted: false,
        status: null,
    }

    componentDidMount() {

       this.getNews();
       
    }

    /*Peticion para traer todas las noticias */
    getNews = () => {
        //peticion ajax
        axios.get("http://localhost:3800/news/") //url a la que le vamos a hacer una peticion por get a la API REST
            .then(res => {
                console.log(res.data);
                this.setState({
                    news: res.data.noticias,
                    status: 'success'

                });
            });

    }

   
    onCheckItem  = (event, id) => {
        document.activeElement.blur();
    }


    render() {

        return (
          
            <section id="content" >

                {this.state.status === 'success' &&
                    <div>

                        {!this.state.searchById &&

                            this.state.news.map(n => {
                                return (
                                  <DataListView
                                        key={n.id}
                                        element={n}
                                        news
                                        onCheckItem={this.onCheckItem}
                                    />
                                );
                            })

                        
                        }


                    </div>

                }

            </section>

        );

    } 

}

export default NewsList;