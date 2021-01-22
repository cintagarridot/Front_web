import React, { Component } from 'react';

import Table from 'components/Table';
import axios from 'axios';
import Slider from 'components/Slider';
import DataListView from '../DataListView';
import newsService from 'services/news-service';

class NewsDetail extends Component {

    state = {
        news: {},
        id: '',
        userId: '',
        user: {},
        status: null,
    }

    componentDidMount() {

        const id = this.props.match.params.id;

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
        const service = axios.create({
            baseURL: 'https://uhu-back.herokuapp.com',
            withCredentials: true, //poner siempre, es el que controla la cookie del header en una petición y es lo que lee el back para saber si tiene current user
          })
        await service.get('/news/' + id)
            .then(res => {
                if (res.data) {
                    this.setState({
                        news: res.data.noticia,
                        userId: res.data.noticia.user,
                        searchById: true,
                        status: 'success'
                    });
                } else {
                    this.setState({
                        status: 'failed'
                    });
                }
            });

            this.getUser(this.state.userId);

    }

    getUser = (id) => {
        const service = axios.create({
            baseURL: 'https://uhu-back.herokuapp.com',
            withCredentials: true, //poner siempre, es el que controla la cookie del header en una petición y es lo que lee el back para saber si tiene current user
          })
        service.get("/users/one/" + id)
            .then( res => {
                if(res.data){

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

                        <Slider
                            size="slider-noticia"
                            id={this.state.news._id}
                            title={this.state.news.title}
                            content={this.state.news.content}
                            author={this.state.user}
                            date={this.state.news.date}
                        ></Slider>

                    </div>

                }



            </section>


        );


    }



}

export default NewsDetail;
