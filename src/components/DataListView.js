import React from "react";
import { Card, CustomInput, Badge } from "reactstrap";
import { withRouter } from "react-router-dom";
import { ContextMenuTrigger } from "react-contextmenu";
import classnames from "classnames";

import moment from 'moment';
import 'moment/locale/es';
import {Col, Row} from "reactstrap";
import { Link } from 'react-router-dom';

const DataListView = ({ isSelect, element, subjects, news, usersList, onCheckItem, ...props }) => {

  return (
    <Col xxs="12" className="mb-5">
      <ContextMenuTrigger id="menu_id" data={element.id}>
        <Card style={{ width: '1000px', height: '90px', fontSize: '16px',
         justifyContent: 'center', padding: '20px' }}
          onClick={event => onCheckItem(event, element.id)}

        >

          {subjects &&

            <Col xs={"4"}>
              <p className="list-item-heading mb-1 truncate">
                {element.title}
              </p>
            </Col>

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


        </Card>
      </ContextMenuTrigger>
    </Col>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(withRouter(DataListView));