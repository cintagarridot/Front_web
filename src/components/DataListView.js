import React from "react";
import { Card, CustomInput, Badge } from "reactstrap";
import { withRouter } from "react-router-dom";
import { ContextMenuTrigger } from "react-contextmenu";
import classnames from "classnames";

import moment from 'moment';
import Col from "reactstrap/es/Col";



const DataListView = ({ isSelect, subject, onCheckItem, ...props }) => {

 
  return (
    <Col xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={subject.id}>
        <Card
          onClick={event => onCheckItem(event, subject.id)}
          //className={classnames("d-flex flex-row", 
            
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">

              <Col xs={"4"}>
                <p className="list-item-heading mb-1 truncate">
                  {subject.title}
                </p>
              </Col>

            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
   </Col>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(withRouter(DataListView));