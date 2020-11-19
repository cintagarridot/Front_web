import React, { Component, Redirect } from 'react';
import { Formik, withFormik } from 'formik';
import Header from './Header';
import { FormGroup, Input, Label, Card, CardTitle, CardBody, Button, Row, Col, Alert, UncontrolledAlert } from 'reactstrap';
import NewsFormSchema from '../schemas/newsFormSchema';
import axios from 'axios';
import withAuth from 'components/withAuth';
import NewsList from './News/List';
import { Link, withRouter } from 'react-router-dom';


class NewsForm extends Component {

    state = {
        userId: '',
        redirection: false,
        alert: '',
        title: '',
        content: '',
        image: '',
    }

    componentDidMount() {
        this.setState({
            userId: this.props.user._id
        })
        console.log('user dep del estado')
        console.log(this.state.user);
    }

    handleSubmit = (values) => {

        values.usuario = this.state.userId;
        console.log(values);
        const news = axios.create({
                baseURL: 'http://localhost:3800/',
                withCredentials: true, //poner siempre, es el que controla la cookie del header en una petición y es lo que lee el back para saber si tiene current user
        })
         news.post("/news/", values)
            .then((data) => {
                console.log('data')
                console.log(data)
                this.setState({
                    alert: 'success',
                })
                window.location.reload();
                
            })
            /* 404 */
            .catch((data) => {
                this.setState({
                    alert: 'fail'
                })
            });

    };


    render() {
        const { title, content, image } = this.state;
        const initialValues = { title, content, image }

        return (

            <>
                <Header />

                <div className={'items-center'}>
                    {this.state.alert === 'success' ?
                        <>
                            <UncontrolledAlert color="success" fade={false} style={{ fontSize: '20px' }}>
                                Noticia creada correctamente
                        </UncontrolledAlert>

                        </>
                        : (this.state.alert === 'fail' &&
                            <Alert color="danger" fade={false} style={{ fontSize: '20px' }}>
                                Error. No se ha creado la noticia
                        </Alert>
                        )
                    }
                    <div id="formulario">
                        <div className="center">

                            <Formik
                                initialValues={ initialValues}
                                validationSchema={NewsFormSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                        console.log('entra');
                                        this.handleSubmit(values);
                                        setSubmitting(true);
                                    }, 400);
                                }}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting,
                                }) => (
                                        <form className="formCompleto" onSubmit={handleSubmit}>
                                            <FormGroup>
                                                <Label class="col-sm-2 col-form-label">Titulo</Label>
                                                <input
                                                    className="form-control"
                                                    type="title"
                                                    name="title"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.title}
                                                    style={{ fontSize: '14px' }}
                                                />

                                                {errors.title && touched.title && errors.title}
                                            </FormGroup>
                                            <FormGroup>
                                                <Label class="col-sm-2 col-form-label">Contenido</Label>
                                                <textarea
                                                    style={{ background: 'white', fontSize: '14px' }}
                                                    type="content"
                                                    name="content"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.content}

                                                />

                                                {errors.content && touched.content && errors.content}
                                            </FormGroup>
                                            <FormGroup>
                                                <input type="file" style={{ fontSize: '14px', marginTop: '10px', marginBottom: '10px' }} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Row>
                                                    <Col xs={'2'}>
                                                        <a href='/news'><Input type="submit" value='Crear' style={{ fontSize: '14px' }}></Input></a>
                                                    </Col>

                                                    <Col xs={'0.1'}>
                                                        <button style={{ fontSize: '14px', textTransform: 'uppercase' }} className="btn btn-secondary" size='lg' color="secondary"><a className={'link-to-pages'} href="/news">Cancelar</a></button>
                                                    </Col>
                                                </Row>
                                            </FormGroup>
                                        </form>
                                    )}
                            </Formik>

                        </div>

                    </div>

                </div>
            </>
        );



    }
}

export default withFormik({

    mapPropsToValues: () => ({ title: '', content: '', image: '' }),
    validationSchema: NewsFormSchema,
    handleSubmit:
        (values, { setSubmitting }) => {

            setSubmitting(true);
            this.handleSubmit(values);

            /*  setTimeout(() => {
                  {this.handleSubmit};
                  console.log('entra');
                  //alert(JSON.stringify(values, null, 2));
                  setSubmitting(true);
              }, 1000);*/
        },
    displayName: 'NewsForm'

})(withRouter(withAuth(NewsForm)));