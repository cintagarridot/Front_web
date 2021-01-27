import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { jsPDF } from "jspdf";
import Header from 'components/Header';

class AddDocument extends Component {


    state = {
      title: '',
      text: '',
      disabledButton: true,
      document: {},
      modal: false,
      docName: '',
    }

    handleForPDF = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const text = this.state.text;

    if(title !== '' && text !== ''){

      this.setState({
        disabledButton: false,
      })
    var doc = new jsPDF('p','in', 'letter', true),
    size = 12,
    font = ['Times', 'Roman'],
    font, size, lines, firstLine,
    margin = 0.5, // inches on a 8.5 x 11 inch sheet.
    verticalOffset = margin,
    loremipsum = text;

    // Margins:
    doc.setDrawColor(0, 255, 0)


    firstLine = doc.setFont(font[0], font[1])
              .setFontSize(18)
              .splitTextToSize(title, 18);


    lines = doc.setFont(font[0], font[1])
              .setFontSize(size)
              .splitTextToSize(loremipsum, 7.5);


    doc.text(3.2, verticalOffset + 18 / 72, firstLine)
    verticalOffset += (firstLine.length + 0.5) * 30 / 72

    doc.text(0.5, verticalOffset + size / 72, lines)

    verticalOffset += (lines.length + 0.5) * size / 72;

    doc.save("documento.pdf");
    this.setState({
      document: doc
    });

    }else{
      alert('Debes escribir un titulo y texto para generar tu documento.')
    }

  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }


  render () {

   const { title, text } = this.state;

  return (
    <>
      <Header/>
      <section id="content" >
        <div className="pt-5 mt-5">
          <h2 className="subheaderdos">Nuevo documento</h2>
        </div>
          <div style={{textAlign: 'initial'}}>
              <h3 className="mt-2 mb-4 text-muted">
                  Descripción
              </h3>
              <h4 className={'mb-5 pb-5'}>
                  Esta página es para crear una solicitud libre.
              </h4>
          </div>
        <form /*encType="multipart/form-data"*/ onSubmit={this.handleForPDF}>
            <Row className={''}>
              <Col xs={'4'} md={'2'} sm={'2'} lg={'2'} style={{textAlign: 'initial', marginTop: '9px'}}>
                <label htmlFor='title'>Título</label>
              </Col>
              <Col xs={'6'} md={'6'} sm={'6'} lg={'6'}>
                <input className={'mt-2 font'} style={{backgroundColor: 'white'}} id='title' required='true' type='text' name='title' value={title} onChange={this.handleChange} />
              </Col>
            </Row>

            <Row>
              <Col xs={'12'} md={'12'} sm={'12'} lg={'12'} style={{textAlign: 'initial', marginTop: '9px'}}>
                <label className={'mt-2'} htmlFor='text'>Texto</label>
              </Col>
              <Col xs={'12'} md={'12'} sm={'12'} lg={'12'}>
                <textarea className={'mt-2 font'} id='text' required='true' type='text' name='text' value={text} onChange={this.handleChange} />
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
export default AddDocument;
