import React, { Component } from 'react';

import Table from 'components/Table';
import axios from 'axios';
import Slider from 'components/Slider';
import DataListView from '../DataListView';

class NewsDetail extends Component {

    state = {
        news: {},
        id: '',
        status: null,
    }

    componentDidMount() {

        console.log('++++')
        console.log(this.props)
        const id = this.props.match.params.id;
        console.log(id)

        if(id){
            this.getNewsById(id);
        }

        if (this.props.update === 'true') {
            this.updateNews(this.props.idToUpdate);
        }

        if (this.props.delete === 'true') {
            this.deleteNews(this.props.idToDelete);
        }

        


    }



    /*Peticion para traer una noticia por id */
    getNewsById = (id) => {
        console.log("search axios");
        console.log(id);
        axios.get("http://localhost:3800/news/" + id) //url a la que le vamos a hacer una peticion por get a la API REST
            .then(res => {
                console.log("ENTRAAAAA");
                console.log("search axios");
                console.log(id);
                console.log("respuesta dentro del axiossss");
                console.log(res.data);
                if (res.data) {
                    this.setState({
                        news: res.data.noticia,
                        searchById: true,
                        status: 'success'
                    });
                    console.log("SOL DESPUES DEL IF")
                    console.log(this.state.searchById);
                    console.log(res.data.noticia);
                    console.log(this.state.news);
                } else {
                    console.log("error")
                    this.setState({
                        status: 'failed'
                    });
                }
            });
    }

    /*Peticion para editar una noticia */
    updateNews = (toUpdate) => {

        axios.put("http://localhost:3800/news/" + toUpdate) //url a la que le vamos a hacer una peticion por get a la API REST
            .then(res => {
                console.log("NOTICIA EDITADA: ");
                console.log(res.data);
                this.setState({
                    news: res.data.noticia,
                    updated: true,
                    status: 'success'
                });
            });

    }



    render() {

        return (

            <section id="content" >

                {this.state.status === 'success' &&
                    <div>
                        <div id="goBackButton" >
                            <a href="javascript:history.back()">
                                Volver
                            </a>
                        </div>
                        {this.state.news.image ? (
                            <div>
                                <Slider
                                    size="slider-noticia"
                                    id={this.state.news._id}
                                    title={this.state.news.title}
                                    content={this.state.news.content}
                                    image={this.state.news.image}
                                    author={this.state.news.usuario}
                                    date={this.state.news.date}
                                ></Slider>
                            </div>
                        ) : (
                                <div>
                                    <Slider
                                        size="slider-noticia"
                                        id={this.state.news._id}
                                        title={this.state.news.title}
                                        content={this.state.news.content}
                                        author={this.state.news.usuario}
                                        date={this.state.news.date}
                                    ></Slider>
                                </div>
                            )
                        }


                    </div>

                }


                }

            </section>


        );


    } s



}

export default NewsDetail;