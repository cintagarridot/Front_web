import React, {useState, useEffect} from "react";
import { Card, CustomInput, Badge } from "reactstrap";
import { withRouter } from "react-router-dom";
import { ContextMenuTrigger } from "react-contextmenu";
import classnames from "classnames";
import withAuth from 'components/withAuth';
import moment from 'moment';
import 'moment/locale/es';
import {Col, Row} from "reactstrap";
import { Link } from 'react-router-dom';
import subjectService from "services/subject-service";
import { confirmAlert } from 'react-confirm-alert';


const DataListView = ({ isSelect, element, subjects, news, usersList, onCheckItem, document, ...props }) => {

  const [ documentPath, setDocumentPath ] = useState('');

  const deleteSubject  = (element) => {
    confirmAlert({
      title: 'Borrar '+element.title,
      message: '¿Estás seguro de borrar esta asignatura?',
      buttons: [
          {
              label: 'Borrar',
              onClick: () => {
                subjectService.deleteSubject(element._id);
                window.location.reload();
              }
          },
          {
              label: 'Cancelar',
          }
      ]
  })

  }

  useEffect (() => {
    if(document && element.path) {
      var file_split = element.path.split('\\');
      const file_name = file_split[6];

      setDocumentPath(file_name);
    }
  })

  return (
    <Col xxs="12" className="mb-5">
      <ContextMenuTrigger id="menu_id" data={element.id}>
        <Card style={{ width: '1000px', height: '90px', fontSize: '16px',
         justifyContent: 'center', padding: '20px', boxShadow: '3px #f7f7f7d7'}}
          onClick={event => onCheckItem(event, element.id)}

        >

          {subjects &&
            <>
              <Row>
                <Col xs={"8"}>
                  <p className="list-item-heading mb-1 truncate">
                    {element.title}
                  </p>
                </Col>


                {props.user.type === 'admin' ?
                <>
                 <Col xs={"2"}>
                  <Link to={'/subject/details/' + element._id} className={'btn btn-primary'} style={{fontSize: '15px'}} >
                    Ver detalles
                  </Link>
                </Col>
                  <Col xs={'2'}>
                    <button className={'btn-danger mt-1'} style={{height: '30px'}} onClick={() => deleteSubject(element)}>Borrar</button>
                  </Col>
                </>
                :(
                  <Col xs={"4"}>
                  <Link to={'/subject/details/' + element._id} className={'btn btn-primary'} style={{fontSize: '15px'}} >
                    Ver detalles
                  </Link>
                </Col>
                  )
                }
              </Row>
            </>
          }

          {news &&
            <>
              <Row>
                <Col xs={"4"}>
                    <p className="list-item-heading mb-1 truncate">
                      {element.title}
                    </p>
                </Col>

                <Col xs={"4"}>
                  <p className="mb-1 text-muted text-small ">

                    {moment(element.date).format('L')}
                  </p>
                </Col>

                <Col xs={"4"} style={{textAlign: 'center'}}>
                  <Link to={'/news/detail/' + element._id} className={'btn btn-primary'} style={{fontSize: '14px'}} >Ver detalles</Link>
                </Col>

              </Row>

            </>
          }

          {usersList &&
            <>
               <Col xs={"4"}>
                <p className="list-item-heading mb-1 truncate">
                  {element.firstName} {element.lastName}
                </p>
             </Col>
             <Col xs={"4"}>
                <p className="list-item-heading mb-1 truncate">
                  {element.username}
                </p>
            </Col>
            </>
          }

          {document &&
            <>
              <Row>
                <Col xs={"6"}>
                    <p className="list-item-heading mb-1 truncate">
                      {element.title}
                    </p>
                </Col>
                <Col xs={"2"}>
                    <p className="list-item-heading mb-1 truncate">
                      {element.user.username}
                    </p>
                </Col>
                <Col xs={'2'}>
                  <p>
                    {moment(element.date).format('L')}
                  </p>
                </Col>
                <Col xs={"2"}>
                  {documentPath !== '' &&
                    <a href={require('../docs/'+documentPath)} id="enlaceDescargarPdf"
                    download={element.file_name}>
                        Descargar
                  </a>
                  }

                </Col>

              </Row>
            </>
          }


        </Card>
      </ContextMenuTrigger>
    </Col>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(withRouter(withAuth(DataListView)));
