import React, { Component } from 'react';


//import Asignatura from './Asignatura';

/*import Slider from './Slider';
import Header from './Header';*/

import withAuth from 'components/withAuth';
import Asignatura from 'components/Asignatura';
import Header from 'components/Header';
import Slider from 'components/Slider';
import {Col, Row} from "reactstrap";

class Principal extends Component {


    render() {

        return (
            <div>
                <Header />
                <Slider
                    size="slider-initial"
                    title="Departamento de Tecnologías de la Información"
                    button="etsi"
                    button2="moodle"
                    button3="uhu"
                />

                <Row>
                    <Col xs={'6'} md={'12'} sm={'12'} lg={'12'}>
                        <Slider
                            size="principalPageButtons"
                        />
                    </Col>
                </Row>



            </div>

        );

    }

}

export default withAuth(Principal);
