import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

/*import logomoodle from '../assets/images/logomoodle.png';
import logoetsi from '../assets/images/logoetsi.png';
import logouhu from '../assets/images/logouhu.jpg';*/
import News from 'components/News';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

class Slider extends Component {

    state = {
        idToUpdate: null,
        idToDelete: null,
        toUpdate: false,
        toDelete: false
    }

    updateNews = (id) => {
        this.setState({
            idToUpdate: id,
            toUpdate: true
        })

        alert("Noticia editada!");

    }

    handleDelete = (id) => {
        confirmAlert({
            title: 'Borrar noticia',
            message: '¿Estás seguro de borrar esta noticia?',
            buttons: [
                {
                    label: 'Borrar',
                    onClick: () => {

                        this.setState({
                            idToDelete: id,
                            toDelete: true
                        });

                    }
                },
                {
                    label: 'Cancelar',
                    onClick: () => {
                        this.setState({
                            toDelete: false
                        })
                    }
                }
            ]
        })


    };


    render() {

        return (


            <div id="slider" className={this.props.size} > {/*<!--le podemos poner varias clases para usarlas dependiendo de que pagina estemos-->*/}

                {this.props.size === 'slider-big' &&
                    <div className="slider-data">
                        <h1>{this.props.title}</h1>
                        <div className="botonAPaginas">
                            <a href="http://www.uhu.es/etsi/" >{this.props.button}</a>
                            <a href="https://moodle.uhu.es/">{this.props.button2}</a>
                            <a href="http://www.uhu.es/index.php" >{this.props.button3}</a>
                        </div>
                    </div>
                }

                {this.props.size === 'slider-sesion' &&
                    <div>
                        <h1 className="titulo-inicioSesion">{this.props.title}</h1>
                        <input type="text" name="usuario" placeholder={this.props.input1} />
                        <input type="text" name="contraseña" placeholder={this.props.input2} />
                        <Link to="/home">{this.props.btn}</Link>
                    </div>
                }

                {this.props.size === 'slider-noticia' && this.props.image &&
                    <div>
                        <h1 className="subheaderdos">{this.props.title}</h1>

                        <div id="newsDivImage">
                            <img src={this.props.image}></img>
                        </div>


                        <div id="newsDivContent">
                            <p>{this.props.content}</p>
                        </div>

                        <div id="newsDivAuthor">
                            <h2>Autor</h2>
                            <Slider
                                size="slider-smallInfo"
                                nameAuthor={this.props.author}
                            />
                        </div>
                        <div id="newsDivDate">
                            <h2>Fecha: {this.props.date}</h2>
                        </div>

                        <div id="newsButton">
                            <button className="delete" onClick={() => this.handleDelete(this.props.id)}>Borrar</button>
                            <button className="update" onClick={() => this.updateNews(this.props.id)}>Editar</button>

                        </div>

                    </div>
                }

                {this.props.size === 'slider-noticia' && !this.props.image &&
                    <div>
                        <h1 className="subheaderdos">{this.props.title}</h1>
                        <div id="newsDivContent2">
                            <p>{this.props.content}</p>
                        </div>
                        <div id="newsDivAuthor">
                            <h2>Autor</h2>
                            <Slider
                                size="slider-smallInfo"
                                nameAuthor={this.props.author}
                            />
                        </div>
                        <div id="newsDivDate">
                            <h2>Fecha: {this.props.date}</h2>
                        </div>

                        <div id="newsButton2">
                            <button className="delete" onClick={() => this.handleDelete(this.props.id)}>Borrar</button>
                            <button className="update" onClick={() => this.updateNews(this.props.id)}>Editar</button>
                            {this.state.toUpdate &&
                                <News
                                    idToUpdate={this.state.idToUpdate}
                                    update="true"
                                />
                            }

                        </div>
                    </div>
                }

                {
                    this.props.size === 'slider-smallInfo' &&
                    <div>
                        <h1>{this.props.nameAuthor}</h1>
                    </div>
                }

                {this.state.toUpdate &&
                    <News
                        idToUpdate={this.state.idToUpdate}
                        update="true"
                    />
                }

                {this.state.toDelete && this.state.idToDelete !== null &&
                    <div>
                        <News
                            idToDelete={this.state.idToDelete}
                            delete="true"
                        ></News>
                        <Redirect to="/noticias"></Redirect>
                    </div>
                }

                {this.props.size === 'slider-form'

                }

                < div className="clearfix"></div>
            </div >

        );


    }


}

export default Slider;