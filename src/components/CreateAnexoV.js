import React, { Component } from 'react';
import {Col, Row, UncontrolledAlert} from 'reactstrap';
import { jsPDF } from "jspdf";
import Header from 'components/Header';

class CreateAnexoV extends Component {


    state = {
        nombreAlumno: '',
        dniAlumno: '',
        tema: '',
        nombreTutor: '',
        estadoTFG: '',

        document: {},
        modal: false,
        docName: '',
        missContent: false,
    }

    handleForPDF = (event) => {
        event.preventDefault();
        const { nombreAlumno, dniAlumno, tema, nombreTutor, estadoTFG } = this.state;

        const title = 'Trabajo de fin de grado. Anexo V';
        const subtitle = 'INFORME FINAL DEL/A TUTOR/A DEL TFG';

        if(nombreAlumno !== '' && dniAlumno !== '' && nombreTutor !== '' && tema !== '' &&
            estadoTFG !== '' ){

            const primerParrafo = `D./Dª ${nombreTutor}, en su calidad de Tutor Académico del Trabajo de Fin de Grado titulado: ${tema}, realizado por D./Dª. ${nombreAlumno}, con DNI nº ${dniAlumno}, en el Grado en Ingeniería Informática, informa ${estadoTFG} el mismo, dado que en principio reúne las condiciones necesarias para su calificación y posterior exposición pública.`;

            this.setState({
                disabledButton: false,
            })
            var doc = new jsPDF('p','in', 'letter', true),
                size = 12,
                font = ['Times', 'Roman'],
                font, size, firstLine, secondLine, thirdLine,
                margin = 0.5, // inches on a 8.5 x 11 inch sheet.
                verticalOffset = margin;

            // Margins:
            doc.setDrawColor(0, 255, 0)


            firstLine = doc.setFont(font[0], font[1])
                .setFontSize(18)
                .splitTextToSize(title, 18);

            secondLine = doc.setFont(font[0], font[1])
                .setFontSize(18)
                .splitTextToSize(subtitle, 18);


            thirdLine = doc.setFont(font[0], font[1])
                .setFontSize(size)
                .splitTextToSize(primerParrafo, 7.5);


            doc.text(3, verticalOffset + 18 / 72, firstLine)
            verticalOffset += (firstLine.length + 0.5) * 30 / 72

            doc.text(2.5, verticalOffset + 18 / 72, secondLine)
            verticalOffset += (secondLine.length + 0.5) * 30 / 72
            verticalOffset += (firstLine.length + 0.3) * 30 / 72

            doc.text(0.5, verticalOffset + 18 / 72, thirdLine)
            verticalOffset += (firstLine.length + 0.8) * 30 / 72


            doc.save("anexoV.pdf");
            this.setState({
                document: doc
            });

        }else{
            this.setState({
                missContent: true,
            })
        }

    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }


    render () {

        const { nombreAlumno, nombreTutor, tema, estadoTFG, dniAlumno } = this.state;


        return (
            <>
                <Header/>
                {this.state.missContent &&
                    <UncontrolledAlert color={'danger'} className={'font'}>
                        Faltan datos por añadir. Por favor, asegúrese que todos los campos están rellenos.
                    </UncontrolledAlert>
                }
                <section id="content" >
                    <div className="pt-5 mt-5">
                        <h2 className="subheaderdos">Anexo V</h2>
                    </div>

                    <div style={{textAlign: 'initial'}}>
                        <h3 className="mt-2 mb-4 text-muted">
                            Descripción
                        </h3>
                        <h4 className={'mb-5 pb-5'}>
                            En este Anexo se realiza el informe final o aval del tutor/a (tutores) para la exposición ante el tribunal.
                            Bajo ningún concepto se aceptará la entrega de un TFG sin contar con el Vº Bº del tutor/a a través de este informe.
                        </h4>
                    </div>

                    <form onSubmit={this.handleForPDF}>

                        <Row className={''}>
                            <Col xs={'4'} md={'2'} sm={'2'} lg={'2'} style={{textAlign: 'initial', marginTop: '9px'}}>
                                <label htmlFor='name'>Nombre del Alumno</label>
                            </Col>
                            <Col xs={'6'} md={'6'} sm={'6'} lg={'6'} className={'text-left'} >
                                <input className={'mt-2 font'} style={{backgroundColor: 'white'}} id='nombreAlumno' required='true' type='text' name='nombreAlumno' value={nombreAlumno} onChange={this.handleChange} />
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={'4'} md={'2'} sm={'2'} lg={'2'} style={{textAlign: 'initial', marginTop: '9px'}}>
                                <label className={'mt-2'} htmlFor='text'>DNI del Alumno</label>
                            </Col>
                            <Col xs={'6'} md={'6'} sm={'6'} lg={'6'}>
                                <input className={'mt-2 font'} style={{backgroundColor: 'white'}} id='dniAlumno' required='true' type='text' name='dniAlumno' value={dniAlumno} onChange={this.handleChange} />
                            </Col>
                        </Row>


                        <Row>
                            <Col xs={'4'} md={'2'} sm={'2'} lg={'2'} style={{textAlign: 'initial', marginTop: '9px'}}>
                                <label className={'mt-2'} htmlFor='text'>Nombre del Tutor</label>
                            </Col>
                            <Col xs={'6'} md={'6'} sm={'6'} lg={'6'}>
                                <input className={'mt-2 font'} style={{backgroundColor: 'white'}} id='nombreTutor' required='true' type='text' name='nombreTutor' value={nombreTutor} onChange={this.handleChange} />
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={'4'} md={'2'} sm={'2'} lg={'2'} style={{textAlign: 'initial', marginTop: '9px'}}>
                                <label className={'mt-2'} htmlFor='text'>Tema elegido</label>
                            </Col>
                            <Col xs={'6'} md={'6'} sm={'6'} lg={'6'}>
                                <input className={'mt-2 font'} style={{backgroundColor: 'white'}} id='tema' required='true' type='text' name='tema' value={tema} onChange={this.handleChange} />
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={'4'} md={'2'} sm={'2'} lg={'2'} style={{textAlign: 'initial', marginTop: '9px'}}>
                                <label className={'mt-2'} htmlFor='text'>Estado del TFG</label>
                            </Col>
                            <Col xs={'6'} md={'6'} sm={'6'} lg={'6'}>
                                <select value={estadoTFG} style={{backgroundColor: 'white'}} onChange={this.handleChange} name='estadoTFG'>
                                    <option value="">Seleccionar estado del TFG...</option>
                                    <option value="favorablemente">Favorable</option>
                                    <option value="desfavorablemente">Desfavorable</option>
                                </select>
                            </Col>
                        </Row>

                        <Row>
                            <Col style={{textAlign: 'end'}}>
                                <input className={'mt-4'} type='submit' value='Generar PDF' />
                            </Col>
                        </Row>

                    </form>

                </section>
            </>
        );
    }
}
export default CreateAnexoV;
