import React, { Component } from 'react';

import Table from 'components/Table';
import axios from 'axios';
import Slider from 'components/Slider';
import DataListView from '../DataListView';

class NewsDetail extends Component {

    state = {
        news: {},
        id: '',
        userId: '',
        user: {},
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
    getNewsById = async(id) => {
        console.log("search axios");
        console.log(id);
        await axios.get("http://localhost:3800/news/" + id) //url a la que le vamos a hacer una peticion por get a la API REST
            .then(res => {
                if (res.data) {
                    this.setState({
                        news: res.data.noticia,
                        userId: res.data.noticia.usuario,
                        searchById: true,
                        status: 'success'
                    });
                } else {
                    console.log("error")
                    this.setState({
                        status: 'failed'
                    });
                }
            });

            this.getUser(this.state.userId);
    
    }

    getUser = (id) => {
        console.log('entra en el getUser')
       console.log(id)
        axios.get("http://localhost:3800/users/one/" + id)
            .then( res => {
                if(res.data){
                    console.log('hola:')
                    console.log(res.data);
                    this.setState({
                        user: res.data.usuario
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
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
                                    author={this.state.user}
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
                                        author={this.state.user}
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