import React, { Component } from 'react';
import {Col, Row} from "reactstrap";


import Header from 'components/Header';

import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import { AddDocument } from './AddDocument';


class ShowDocument extends Component {
    render() {
        return (
            <div className="mt-5 pt-5">
                <Row>
                <Col xs="12">
                    <Row>
                        {/*<a href={require('../docs/documento.pdf')} id="enlaceDescargarPdf"
                            download="documento.pdf"
                        >
                            Tu dispositivo no puede visualizar los PDF, da click aquí para descargarlo
        </a>*/}
                    </Row>
                </Col>
                <Col xs="12">
                    <Row>
                        {/*<object
                            data={require('../docs/documento.pdf')}
                            type="application/pdf"
                            width="100%"
                            height="100%"
                            >
                            
    </object>*/}
                    </Row> 
                </Col>
                </Row>
   
                    
            </div>
        );
    }

}
export default ShowDocument;