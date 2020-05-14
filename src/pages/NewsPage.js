import React, { Component } from 'react';
import SideBar from 'components/SideBar';

import News from 'components/News';
import withAuth from 'components/withAuth';
import Header from 'components/Header';

class NewsPage extends Component {

      

    render() {

        return (
            <>
                <Header />
                <div className="center">

                    <section id="content">


                        <h2 className="subheaderdos">Noticias</h2>
                        
                        
                            <th>
                                <input className= "searchNews" type="text" placeholder="Buscar noticia..." />
                            </th>  
                            <th>
                                <button className="buttonSearch">Buscar</button>
                            </th>
                            
                      
                        <input type="date" className="dateSearchNews"/>

                        <News/>
                        <div className="clearfix"></div>

                    </section>

                    <SideBar texto="¿Desea crear una nueva noticia?" btn="Crear noticia"></SideBar>
                </div >

            </>



        );
    }


}

export default withAuth(NewsPage);