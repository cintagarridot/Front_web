import React, { Component } from 'react';

import Table from 'components/Table';
import axios from 'axios';
import Slider from 'components/Slider';
import DataListView from './DataListView';

class News extends Component {

    state = {
        news: {},
        byId: {},
        searchById: false,
        updated: false,
        deleted: false,
        status: null
    }

    componentWillMount() {

        var search = this.props.search;
        console.log("search desde props");
        console.log(search);

        if (this.props.update === 'true') {
            this.updateNews(this.props.idToUpdate);
        }

        if (this.props.delete === 'true') {
            this.deleteNews(this.props.idToDelete);
        }

        if (search && search != null && search != undefined) {
            console.log("entra en el will mount");
            this.getNewsById(search);
        } else {
            console.log("entra en el else");
            this.getNews();
        }
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

    /*Peticion para traer una noticia por id */
    getNewsById = (toSearch) => {
        console.log("search axios");
        console.log(toSearch);
        axios.get("http://localhost:3800/news/" + toSearch) //url a la que le vamos a hacer una peticion por get a la API REST
            .then(res => {
                console.log("ENTRAAAAA");
                console.log("search axios");
                console.log(toSearch);
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

    /*Peticion para eliminar una noticia*/
    deleteNews = (toDelete) => {
        axios.delete("http://localhost:3800/news/" + toDelete)
            .then(res => {
                console.log("NOTICIA BORRADA: ");
                console.log(res.data);
                this.setState({
                    deleted: true,
                    status: 'success'
                })
            })
    }

    onCheckItem  = (event, id) => {
        document.activeElement.blur();
    }


    render() {

        console.log("//////////");
        console.log(this.state.searchById);
        console.log("search ");
        console.log(this.search);
        console.log("******* metodo")
        console.log(this.getNewsById.byId);

        return (

            <section id="content" >

                {this.state.status === 'success' &&
                    <div>

                        {!this.state.searchById ? (

                            this.state.news.map(n => {
                                return (
                                    /*}  <Table
                                          key={n._id}
                                          title={n.title}
                                          date={n.date}
                                          author={n.author}
                                          linktonews={"/noticias/" + n._id}>
                                        </Table>*/

                                    <DataListView
                                        key={n.id}
                                        element={n}
                                        news
                                        onCheckItem={this.onCheckItem}
                                    />


                                );
                            })

                        ) : (
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
                            )
                        }


                    </div>

                }

            </section>


        );


    } s



}

export default News;