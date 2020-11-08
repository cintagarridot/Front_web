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
    horizontalOffset = margin,
    loremipsum = text;
    // Margins:
    doc.setDrawColor(0, 255, 0)
    //.setLineWidth(1 / 72)
    //.line(margin, margin, margin, 11 - margin)
    //.line(8.5 - margin, margin, 8.5 - margin, 11 - margin)


    firstLine = doc.setFont(font[0], font[1])
              .setFontSize(size)
              .splitTextToSize(title, 7.5)
    

    lines = doc.setFont(font[0], font[1])
              .setFontSize(size)
              .splitTextToSize(loremipsum, 7.5)

    doc.text(0.5, verticalOffset + size / 72, firstLine)
    verticalOffset += (firstLine.length + 0.5) * size / 72

    doc.text(0.5, verticalOffset + size / 72, lines)

    verticalOffset += (lines.length + 0.5) * size / 72

    doc.save("documento.pdf");
    this.setState({
      document: doc
    });
      // the 3 blocks of text
      /*for (var i in fonts) {
      if (fonts.hasOwnProperty(i)) {
        font = fonts[i]
        size = sizes[i]

        lines = doc.setFont(font[0], font[1])
              .setFontSize(size)
              .splitTextToSize(loremipsum, 7.5)
      
        
      }
      }*/

     
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
        <form /*encType="multipart/form-data"*/ onSubmit={this.handleForPDF}>
            <Row className={''}>
              <Col xs={'12'}>
                <label htmlFor='title'>Título</label>
              </Col>
              <Col xs={'12'} >
                <input className={'mt-2 font'} id='title' required='true' type='text' name='title' value={title} onChange={this.handleChange} />
              </Col>
            </Row>

            <Row>
              <Col xs={'12'}>
                <label className={'mt-2'} htmlFor='text'>Texto</label>
              </Col>
              <Col xs={'12'}>
                <textarea className={'mt-2 font'} id='text' required='true' type='text' name='text' value={text} onChange={this.handleChange} />
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
    /*<div style={{textAlign: 'center'}}>
      <br />
      <a href={'/pdf'} target="_blank"><button>Ir a PDF</button></a>
    </div>  */
  );
  }
}
export default AddDocument;