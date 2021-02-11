import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { jsPDF } from "jspdf";
import Header from 'components/Header';

class AskForCorrection extends Component {


    state = {
        nombreAlumno: '',
        dniAlumno: '',
        tema: '',
        nombreTutor: '',

        document: {},
        modal: false,
        docName: '',
    }

    handleForPDF = (event) => {
        event.preventDefault();
        const { nombreAlumno, dniAlumno, tema, nombreTutor } = this.state;

        const title = 'Trabajo de fin de grado';
        const subtitle = 'SOLICITUD DE CORRECCIÓN';

        if(nombreAlumno !== '' && dniAlumno !== '' && nombreTutor !== '' && tema !== ''){

            const primerParrafo = `D./Dª ${nombreAlumno}, con DNI nº ${dniAlumno} y con el Trabajo de Fin de Grado titulado: ${tema}, en el Grado en Ingeniería Informática, cuyo tutor es ${nombreTutor}, solicita la corrección del mismo.`;

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


            doc.text(3.2, verticalOffset + 18 / 72, firstLine)
            verticalOffset += (firstLine.length + 0.5) * 30 / 72

            doc.text(3, verticalOffset + 18 / 72, secondLine)
            verticalOffset += (secondLine.length + 0.6) * 30 / 72

            doc.text(0.5, verticalOffset + 18 / 72, thirdLine)
            verticalOffset += (firstLine.length + 0.8) * 30 / 72


            doc.save("correccionTFG.pdf");
            this.setState({
                document: doc
            });

        }else{
            alert('Debes completar todos los campos para generar tu documento.')
        }

    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }


    render () {

        const { nombreAlumno, nombreTutor, tema, dniAlumno } = this.state;


        return (
            <>
                <Header/>
                <section id="content" >
                    <div className="pt-5 mt-5">
                        <h2 className="subheaderdos">Solicitar corrección</h2>
                    </div>

                    <div style={{textAlign: 'initial'}}>
                        <h3 className="mt-2 mb-4 text-muted">
                            Descripción
                        </h3>
                        <h4 className={'mb-5 pb-5'}>
                            En esta solicitud se quiere pedir la corrección de un TFG.
                        </h4>
                    </div>

                    <form onSubmit={this.handleForPDF}>

                        <Row className={''}>
                            <Col xs={'6'} md={'2'} sm={'2'} lg={'2'} style={{textAlign: 'initial', marginTop: '9px'}}>
                                <label htmlFor='name'>Nombre del Alumno</label>
                            </Col>
                            <Col xs={'10'} md={'8'} sm={'8'} lg={'8'} className={'text-left'} >
                                <input className={'mt-2 font'} style={{backgroundColor: 'white'}} id='nombreAlumno' required='true' type='text' name='nombreAlumno' value={nombreAlumno} onChange={this.handleChange} />
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={'6'} md={'2'} sm={'2'} lg={'2'} style={{textAlign: 'initial', marginTop: '9px'}}>
                                <label className={'mt-2'} htmlFor='text'>DNI del Alumno</label>
                            </Col>
                            <Col xs={'10'} md={'8'} sm={'8'} lg={'8'}>
                                <input className={'mt-2 font'} style={{backgroundColor: 'white'}} id='dniAlumno' required='true' type='text' name='dniAlumno' value={dniAlumno} onChange={this.handleChange} />
                            </Col>
                        </Row>


                        <Row>
                            <Col xs={'6'} md={'2'} sm={'2'} lg={'2'} style={{textAlign: 'initial', marginTop: '9px'}}>
                                <label className={'mt-2'} htmlFor='text'>Nombre del Tutor</label>
                            </Col>
                            <Col xs={'10'} md={'8'} sm={'8'} lg={'8'}>
                                <input className={'mt-2 font'} style={{backgroundColor: 'white'}} id='nombreTutor' required='true' type='text' name='nombreTutor' value={nombreTutor} onChange={this.handleChange} />
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={'6'} md={'2'} sm={'2'} lg={'2'} style={{textAlign: 'initial', marginTop: '9px'}}>
                                <label className={'mt-2'} htmlFor='text'>Tema elegido</label>
                            </Col>
                            <Col xs={'10'} md={'8'} sm={'8'} lg={'8'}>
                                <input className={'mt-2 font'} style={{backgroundColor: 'white'}} id='tema' required='true' type='text' name='tema' value={tema} onChange={this.handleChange} />
                            </Col>
                        </Row>

                        <Row style={{textAlign: 'end', alignItems: 'center'}}>
                            <Col xs={'12'} sm={'11'} md={'11'} lg={'11'} className="buttonBack">
                                <a href="javascript:history.back()">
                                    Volver
                                </a>
                            </Col>
                            <Col xs={'12'} sm={'1'} md={'1'} lg={'1'}>
                                <input className={'mt-4'} type='submit' value='Generar PDF' />
                            </Col>
                        </Row>

                    </form>

                </section>
            </>
        );
    }
}
export default AskForCorrection;
