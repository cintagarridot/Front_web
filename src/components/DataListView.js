import React from "react";
import { Card, CustomInput, Badge } from "reactstrap";
import { withRouter } from "react-router-dom";
import { ContextMenuTrigger } from "react-contextmenu";
import classnames from "classnames";

import moment from 'moment';
import Col from "reactstrap/es/Col";
import { Link } from 'react-router-dom';



const DataListView = ({ isSelect, element, subjects, news, onCheckItem, ...props }) => {

  console.log(element);
  return (
    <Col xxs="12" className="mb-5">
      <ContextMenuTrigger id="menu_id" data={element.id}>
        <Card
          onClick={event => onCheckItem(event, element.id)}

        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">

              {subjects &&

                <Col xs={"4"}>
                  <p className="list-item-heading mb-1 truncate">
                    {element.title}
                  </p>
                </Col>

              }

              {news &&
                <>
                  <Col xs={"4"}>
                    <Link to={'/news/detail/'+element._id} className={'link-to-news'} >
                      <p className="list-item-heading mb-1 truncate">
                        {element.title}
                      </p>
                    </Link>
                  </Col>

                  <Col xs={"3"}>
                    <p className="mb-1 text-muted text-small w-15 w-sm-100">
                      {moment(element.date).format('L')}
                    </p>
                  </Col>
                </>
              }
            </div>
          </div>

        </Card>
      </ContextMenuTrigger>
    </Col>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(withRouter(DataListView));