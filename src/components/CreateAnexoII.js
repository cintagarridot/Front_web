import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { jsPDF } from "jspdf";
import Header from 'components/Header';

class CreateAnexoII extends Component {


    state = {
        name: '',
        dni: '',
        correo: '',
        tlf: '',
        tema1: '',
        tema2: '',
        tema3: '',
        nombreTutor: '',

        document: {},
        modal: false,
        docName: '',
    }

    handleForPDF = (event) => {
        event.preventDefault();
        const { name, dni, correo, tlf, tema2, tema1, tema3, nombreTutor } = this.state;

        const title = 'Trabajo de fin de grado. Anexo II';
        const subtitle = 'Selección de temas';

        if(name !== '' && dni !== '' && tlf !== '' && nombreTutor !== '' && correo !== '' && tema1 !== '' &&
        tema2 !== '' && tema3 !== '' ){

            const primerParrafo = `D/Dña: ${name}, alumno/a del Grado en Informática, que se imparte en la Universidad de Huelva, declara estar matriculado y en condición de cursar el Trabajo de Fin de Grado, según la normativa académica de la UHU, y por lo tanto solicita: `;

            const segundoParrafo = `Que le sea asignado, de entre los temas para Trabajo Fin de Grado, aprobados y hechos públicos por la Comisión Académica del TFG, uno de los siguientes temas/líneas de trabajo, ordenados según preferencia, de arriba a abajo y de mayor a menor preferencia:`

            const tema1Parrafo = `- ${tema1}`
            const tema2Parrafo = `- ${tema2}`
            const tema3Parrafo = `- ${tema3}`

            const nombre = 'Nombre: ' + name;
            const dni_mine = 'DNI: ' + dni;
            const telefono = 'Teléfono: ' + tlf;
            const correo_mine = 'Correo: ' + correo;

            this.setState({
                disabledButton: false,
            })
            var doc = new jsPDF('p','in', 'letter', true),
                size = 12,
                font = ['Times', 'Roman'],
                font, size, firstLine, secondLine, thirdLine, fourthLine, nombreCompleto, movil, gmail, nif,
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

            fourthLine = doc.setFont(font[0], font[1])
                .setFontSize(size)
                .splitTextToSize(segundoParrafo, 7.5);

            nombreCompleto = doc.setFont(font[0], font[1])
                .setFontSize(size)
                .splitTextToSize(nombre, 7.5);

            nif = doc.setFont(font[0], font[1])
                .setFontSize(size)
                .splitTextToSize(dni_mine, 7.5);

            gmail = doc.setFont(font[0], font[1])
                .setFontSize(size)
                .splitTextToSize(correo_mine, 7.5);

            movil = doc.setFont(font[0], font[1])
                .setFontSize(size)
                .splitTextToSize(telefono, 7.5);


            doc.text(3, verticalOffset + 18 / 72, firstLine)
            verticalOffset += (firstLine.length + 0.5) * 30 / 72

            doc.text(3.4, verticalOffset + 18 / 72, secondLine)
            verticalOffset += (secondLine.length + 0.5) * 30 / 72

            doc.text(0.5, verticalOffset + 18 / 72, thirdLine)
            verticalOffset += (firstLine.length + 0.5) * 30 / 72

            doc.text(0.5, verticalOffset + 18 / 72, fourthLine)
            verticalOffset += (firstLine.length + 0.5) * 30 / 72

            doc.text(3.4, verticalOffset + size / 72, 'Temas')
            verticalOffset += (firstLine.length + 0.5) * 30 / 72

            doc.text(0.5, verticalOffset + size / 72, tema1Parrafo)
            verticalOffset += (tema1Parrafo.length + 0.5) * 30 / 72

            doc.text(0.5, verticalOffset + size / 72, tema2Parrafo)
            verticalOffset += (tema2Parrafo.length + 0.5) * 30 / 72

            doc.text(0.5, verticalOffset + size / 72, tema3Parrafo)
            verticalOffset += (tema3Parrafo.length + 0.5) * 30 / 72

            doc.text(3.2, verticalOffset + size / 72, 'Datos del alumno/a')
            verticalOffset += (firstLine.length + 0.5) * 30 / 72

            doc.text(0.5, verticalOffset + size / 72, nombreCompleto)
            verticalOffset += (firstLine.length + 0.5) * 30 / 72

            doc.text(0.5, verticalOffset + size / 72, nif)
            verticalOffset += (firstLine.length + 0.5) * 30 / 72

            doc.text(0.5, verticalOffset + size / 72, gmail)
            verticalOffset += (firstLine.length + 0.5) * 30 / 72

            doc.text(0.5, verticalOffset + size / 72, movil)
            verticalOffset += (firstLine.length + 0.5) * 30 / 72

            doc.save("anexoII.pdf");
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

        const { name, dni, tlf, correo, nombreTutor, tema3, tema1, tema2 } = this.state;


        return (
            <>
                <Header/>
                <section id="content" >
                    <div className="pt-5 mt-5">
                        <h2 className="subheaderdos">Anexo II</h2>
                    </div>
                    <form onSubmit={this.handleForPDF}>

                        <Row className={''}>
                            <Col xs={'4'} className={'text-right'}>
                                <label htmlFor='name'>Nombre completo</label>
                            </Col>
                            <Col xs={'8'} className={'text-left'} >
                                <input className={'mt-2 font'} id='name' required='true' type='text' name='name' value={name} onChange={this.handleChange} />
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={'4'} className={'text-right'}>
                                <label className={'mt-2'} htmlFor='text'>DNI</label>
                            </Col>
                            <Col xs={'8'}>
                                <input className={'mt-2 font'} id='dni' required='true' type='text' name='dni' value={dni} onChange={this.handleChange} />
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={'4'} className={'text-right'}>
                                <label className={'mt-2'} htmlFor='text'>Teléfono</label>
                            </Col>
                            <Col xs={'8'}>
                                <input className={'mt-2 font'} id='tlf' required='true' type='text' name='tlf' value={tlf} onChange={this.handleChange} />
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={'4'} className={'text-right'}>
                                <label className={'mt-2'} htmlFor='text'>Correo</label>
                            </Col>
                            <Col xs={'8'}>
                                <input className={'mt-2 font'} id='correo' required='true' type='text' name='correo' value={correo} onChange={this.handleChange} />
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={'12'} className={'text-center mt-5 mb-5'}>
                                <label>Temas a elegir</label>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={'4'} className={'text-right'}>
                                <label className={'mt-2'} htmlFor='text'>Tema 1</label>
                            </Col>
                            <Col xs={'8'}>
                                <input className={'mt-2 font'} id='tema1' required='true' type='text' name='tema1' value={tema1} onChange={this.handleChange} />
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={'4'} className={'text-right'}>
                                <label className={'mt-2'} htmlFor='text'>Tema 2</label>
                            </Col>
                            <Col xs={'8'}>
                                <input className={'mt-2 font'} id='tema2' required='true' type='text' name='tema2' value={tema2} onChange={this.handleChange} />
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={'4'} className={'text-right'}>
                                <label className={'mt-2'} htmlFor='text'>Tema 3</label>
                            </Col>
                            <Col xs={'8'}>
                                <input className={'mt-2 font'} id='tema3' required='true' type='text' name='tema3' value={tema3} onChange={this.handleChange} />
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={'4'} className={'text-right'}>
                                <label className={'mt-2'} htmlFor='text'>Tutor</label>
                            </Col>
                            <Col xs={'8'}>
                                <input className={'mt-2 font'} id='nombreTutor' required='true' type='text' name='nombreTutor' value={nombreTutor} onChange={this.handleChange} />
                            </Col>
                        </Row>

                        <Row>
                            <Col className={'text-center'}>
                                <input className={'mt-4'} type='submit' value='Generar PDF' />
                            </Col>
                        </Row>

                    </form>

                </section>
            </>
        );
    }
}
export default CreateAnexoII;
