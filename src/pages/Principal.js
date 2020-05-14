import React, { Component } from 'react';


//import Asignatura from './Asignatura';

/*import Slider from './Slider';
import Header from './Header';*/

import withAuth from 'components/withAuth';
import Asignatura from 'components/Asignatura';
import Header from 'components/Header';
import Slider from 'components/Slider';

class Principal extends Component {


    render() {
        /* 
           if (this.state.subjects.length >= 1) {
               return (
                   <div>
                       <h2 className="subheader">Asignaturas</h2>
                   </div>
               );
           } else if (this.state.subjects.length === 0 && this.state.status === 'success') {
               //no hay asignaturas
               return (
                   <div>
                       <h2 className="subheader">No hay asignaturas para mostrar</h2>
                       <p>Todavia no hay contenido en esta sección</p>
                   </div>
               );
   
           } else { //la pagina está cargando
               return (
                   <div>
                       <h2 className="subheader">Cargando...</h2>
                       <p>Espere mientras carga el contenido</p>
                   </div>
               );
           } */

        var nombre = "Cinta Garrido";
        return (
            <div>
                <Header />
                <Slider
                    size="slider-big"
                    title="Departamento de Tecnología de la Información"
                    button="etsi"
                    button2="moodle"
                    button3="uhu"
                />
               
                <Asignatura />

            </div>

        );

    }

}

export default withAuth(Principal);