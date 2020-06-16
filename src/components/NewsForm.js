import React, { Component, Redirect } from 'react';
import { Formik, withFormik } from 'formik';
import Header from './Header';
import { FormGroup, Input, Label, Card, CardTitle, CardBody, Button, Row, Col } from 'reactstrap';
import NewsFormSchema from '../schemas/newsFormSchema';
import axios from 'axios';
import withAuth from 'components/withAuth';
import NewsList from './News/List';
import { Link, withRouter } from 'react-router-dom';


class NewsForm extends Component {

    state = {

        userId: '',
        redirection: false,
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
        /*newsService
            .addNews(values)*/
        axios.post("http://localhost:3800/news/", values)
            .then((data) => {
                console.log('added', data);
            })
            /* 404 */
            .catch((data) => {
                console.log('error', data);
            });

    };

   
    render() {

        return (

            <div id="formulario">
                <Header />
                <div className="center">

                    <Formik
                        initialValues={{ title: '', content: '', image: '' }}
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
                                        />

                                        {errors.title && touched.title && errors.title}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label class="col-sm-2 col-form-label">Contenido</Label>
                                        <textarea
                                            style={{ background: 'white' }}
                                            type="content"
                                            name="content"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.content}
                                        />

                                        {errors.content && touched.content && errors.content}
                                    </FormGroup>
                                    <FormGroup>
                                        <input type="file" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Col xs={'1'}>
                                            <a href='/news'><Input type="submit" value='Crear'></Input></a>
                                            </Col>

                                            <Col xs={'0.1'}>
                                                <button className="btn btn-secondary" size='lg' color="secondary"><a className={'link-to-pages'} href="/news">Cancelar</a></button>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </form>
                            )}
                    </Formik>

                </div>
              

            </div>

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