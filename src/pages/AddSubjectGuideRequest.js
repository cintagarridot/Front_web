import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { jsPDF } from "jspdf";
import Header from 'components/Header';

class AddSubjectGuideRequest extends Component {


    state = {
      name: '',
      dni: '',
      correo: '',
      curso: '',
      tlf: '',
      AsigCurse: '',
      AsigName: '',
      AsigCod: '',
      document: {},
      modal: false,
      docName: '',
    }

    handleForPDF = (event) => {
    event.preventDefault();
    const { name, dni, curso, correo, tlf, AsigCod, AsigName, AsigCurse } = this.state;

    const title = 'Petición de guía de una asignatura';

    if(name !== '' && dni !== '' && tlf !== '' && curso !== '', correo !== '' && AsigCod !== '' &&
    AsigName !== '' && AsigCurse !== '' ){

        const nombre = 'Nombre: ' + name;
        const dni_mine = 'DNI: ' + dni;
        const telefono = 'Teléfono: ' + tlf;
        const curso_mine = 'Curso actual: ' + curso;
        const correo_mine = 'Correo: ' + correo;
        const Codigo_asig = 'Código de la asignatura: ' + AsigCod;
        const Nombre_asig = 'Nombre de la asignatura: ' + AsigName;
        const Curso_asig = 'Curso de la asignatura: ' + AsigCurse;

      this.setState({
        disabledButton: false,
      })
        var doc = new jsPDF('p','in', 'letter', true),
        size = 12,
        font = ['Times', 'Roman'],
        font, size, nombreCompleto, firstLine, curse, nif, gmail, asigName, asigCurse, asigCode, movil,
        margin = 0.5, // inches on a 8.5 x 11 inch sheet.
        verticalOffset = margin;

        // Margins:
        doc.setDrawColor(0, 255, 0)


        firstLine = doc.setFont(font[0], font[1])
                .setFontSize(18)
                .splitTextToSize(title, 18);


        nombreCompleto = doc.setFont(font[0], font[1])
                .setFontSize(size)
                .splitTextToSize(nombre, 7.5);

        nif = doc.setFont(font[0], font[1])
        .setFontSize(size)
        .splitTextToSize(dni_mine, 7.5);

        gmail = doc.setFont(font[0], font[1])
        .setFontSize(size)
        .splitTextToSize(correo_mine, 7.5);

        curse = doc.setFont(font[0], font[1])
        .setFontSize(size)
        .splitTextToSize(curso_mine, 7.5);

        asigCode = doc.setFont(font[0], font[1])
        .setFontSize(size)
        .splitTextToSize(Codigo_asig, 7.5);

        asigName = doc.setFont(font[0], font[1])
        .setFontSize(size)
        .splitTextToSize(Nombre_asig, 7.5);

        asigCurse = doc.setFont(font[0], font[1])
        .setFontSize(size)
        .splitTextToSize(Curso_asig, 7.5);

        movil = doc.setFont(font[0], font[1])
        .setFontSize(size)
        .splitTextToSize(telefono, 7.5);

        doc.text(3.2, verticalOffset + 18 / 72, firstLine)
        verticalOffset += (firstLine.length + 0.5) * 30 / 72

        doc.text(0.5, verticalOffset + size / 72, 'Datos del alumno/a')

        verticalOffset += (firstLine.length + 0.5) * 30 / 72

        doc.text(0.5, verticalOffset + size / 72, nombreCompleto)

        verticalOffset += (firstLine.length + 0.5) * 30 / 72

        doc.text(0.5, verticalOffset + size / 72, nif)

        verticalOffset += (firstLine.length + 0.5) * 30 / 72

        doc.text(0.5, verticalOffset + size / 72, gmail)

        verticalOffset += (firstLine.length + 0.5) * 30 / 72

        doc.text(0.5, verticalOffset + size / 72, curse)

        verticalOffset += (firstLine.length + 0.5) * 30 / 72

        doc.text(0.5, verticalOffset + size / 72, movil)

        verticalOffset += (firstLine.length + 0.5) * 30 / 72

        doc.text(0.5, verticalOffset + size / 72, 'Datos de la asignatura')

        verticalOffset += (firstLine.length + 0.5) * 30 / 72

        doc.text(0.5, verticalOffset + size / 72, asigCode)

        verticalOffset += (firstLine.length + 0.5) * 30 / 72

        doc.text(0.5, verticalOffset + size / 72, asigName)

        verticalOffset += (firstLine.length + 0.5) * 30 / 72

        doc.text(0.5, verticalOffset + size / 72, asigCurse)

        verticalOffset += (firstLine.length + 0.5) * 30 / 72

        verticalOffset += (firstLine.length + 0.5) * 30 / 72

        doc.save("subject-guide-request.pdf");
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

    const { name, dni, curso, tlf, grado, correo, telefono, AsigCod, AsigName, AsigCurse} = this.state;


  return (
    <>
      <Header/>
      <section id="content" >
        <div className="pt-5 mt-5">
          <h2 className="subheaderdos">Petición de guía de una asignatura</h2>
        </div>

          <div style={{textAlign: 'initial'}}>
              <h3 className="mt-2 mb-4 text-muted">
                  Descripción
              </h3>
              <h4 className={'mb-5 pb-5'}>
                    Esta solicitud es para obtener el documento que concreta la planificación docente referida a la asignatura indicada abajo.
              </h4>
          </div>
        <form /*encType="multipart/form-data"*/ onSubmit={this.handleForPDF}>

            <Row className={''}>
              <Col xs={'6'} md={'2'} sm={'2'} lg={'2'} style={{textAlign: 'initial', marginTop: '9px'}}>
                <label htmlFor='name'>Nombre completo</label>
              </Col>
              <Col xs={'10'} md={'8'} sm={'8'} lg={'8'} className={'text-left'} >
                <input className={'mt-2 font'} style={{backgroundColor: 'white'}} id='name' required='true' type='text' name='name' value={name} onChange={this.handleChange} />
              </Col>
            </Row>

            <Row>
              <Col xs={'4'} md={'2'} sm={'2'} lg={'2'} style={{textAlign: 'initial', marginTop: '9px'}}>
                <label className={'mt-2'} htmlFor='text'>DNI</label>
              </Col>
              <Col xs={'10'} md={'8'} sm={'8'} lg={'8'}>
                <input className={'mt-2 font'} style={{backgroundColor: 'white'}} id='dni' required='true' type='text' name='dni' value={dni} onChange={this.handleChange} />
              </Col>
            </Row>

            <Row>
              <Col xs={'4'} md={'2'} sm={'2'} lg={'2'} style={{textAlign: 'initial', marginTop: '9px'}}>
                <label className={'mt-2'} htmlFor='text'>Teléfono</label>
              </Col>
              <Col xs={'10'} md={'8'} sm={'8'} lg={'8'}>
                <input className={'mt-2 font'} style={{backgroundColor: 'white'}} id='tlf' required='true' type='text' name='tlf' value={tlf} onChange={this.handleChange} />
              </Col>
            </Row>

            <Row>
              <Col xs={'4'} md={'2'} sm={'2'} lg={'2'} style={{textAlign: 'initial', marginTop: '9px'}}>
                <label className={'mt-2'} htmlFor='text'>Correo</label>
              </Col>
              <Col xs={'10'} md={'8'} sm={'8'} lg={'8'}>
                <input className={'mt-2 font'} style={{backgroundColor: 'white'}} id='correo' required='true' type='text' name='correo' value={correo} onChange={this.handleChange} />
              </Col>
            </Row>

            <Row>
              <Col xs={'6'} md={'2'} sm={'2'} lg={'2'} style={{textAlign: 'initial', marginTop: '9px'}}>
                <label className={'mt-2'} htmlFor='text'>Curso actual</label>
              </Col>
              <Col xs={'10'} md={'8'} sm={'8'} lg={'8'}>
                <input className={'mt-2 font'} style={{backgroundColor: 'white'}} id='curso' required='true' type='text' name='curso' value={curso} onChange={this.handleChange} />
              </Col>
            </Row>

            <Row>
                <Col xs={'12'} md={'12'} sm={'12'} lg={'12'} className={'text-center mt-5 mb-5'}>
                    <label>Datos de la asignatura</label>
                </Col>
            </Row>

            <Row>
              <Col xxs={'6'} xs={'6'} md={'2'} sm={'2'} lg={'2'} style={{textAlign: 'initial', marginTop: '9px'}}>
                <label className={'mt-2'} htmlFor='text'>Título</label>
              </Col>
              <Col xs={'10'} md={'8'} sm={'8'} lg={'8'}>
                <input className={'mt-2 font'} style={{backgroundColor: 'white'}} id='AsigName' required='true' type='text' name='AsigName' value={AsigName} onChange={this.handleChange} />
              </Col>
            </Row>

            <Row>
              <Col xs={'6'} md={'2'} sm={'2'} lg={'2'} style={{textAlign: 'initial', marginTop: '9px'}}>
                <label className={'mt-2'} htmlFor='text'>Código</label>
              </Col>
              <Col xs={'10'} md={'8'} sm={'8'} lg={'8'}>
                <input className={'mt-2 font'} style={{backgroundColor: 'white'}} id='AsigCod' required='true' type='text' name='AsigCod' value={AsigCod} onChange={this.handleChange} />
              </Col>
            </Row>

            <Row>
              <Col xs={'6'} md={'2'} sm={'2'} lg={'2'} style={{textAlign: 'initial', marginTop: '9px'}}>
                <label className={'mt-2'} htmlFor='text'>Curso</label>
              </Col>
              <Col xs={'10'} md={'8'} sm={'8'} lg={'8'}>
                <input className={'mt-2 font'} style={{backgroundColor: 'white'}} id='AsigCurse' required='true' type='text' name='AsigCurse' value={AsigCurse} onChange={this.handleChange} />
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
export default AddSubjectGuideRequest;
