import React, {useState, useEffect} from "react";
import {
    Card,
    CustomInput,
    Badge,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Modal,
    ModalHeader, ModalBody, ModalFooter, Button, UncontrolledAlert
} from "reactstrap";
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
import documentService from "../services/document-service";
import notificationService from "../services/notification-service";
import userService from "../services/user-service";


const DataListView = ({ isSelect, element, subjects, news, usersList, onCheckItem, document, notifications, ...props }) => {

  const [ documentPath, setDocumentPath ] = useState('');
  const [dropdownDocOpen, setDropdownDocOpen] = useState(false);
  const [dropdownEditDoc, setDropdownEditDoc] = useState(false);
  const [editDocId, setEditDocId] = useState('');
  const [docName, setDocName] = useState(element.title !== '' ? element.title : '');
  const [selectedFile, setSelectedFile] = useState();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [alertFile, setAlertFile] = useState(false);
  const [dropdownShareDoc, setDropdownShareDoc] = useState(false);
  const [shareDoc, setShareDoc] = useState({});
  const [teachers, setTeachers] = useState([]);
  const [teachersSelected, setTeachersSelected] = useState([]);
  const [showRedText, setShowRedText] = useState(false);

  console.log('EEELEMENT', element)

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

    const getTeacherList = async() => {
        await userService.getTeachersList()
            .then(res => {
                console.log(res.data);
                setTeachers(res.teachers);
            });
    }

    useEffect(() => {
        if(dropdownShareDoc === true){
            getTeacherList();
        }
    }, [dropdownShareDoc])


    useEffect (() => {
    if(document && element.path) {
      var file_split = element.path.split('\\');
      const file_name = file_split[6];

      setDocumentPath(file_name);
    }
  });

    const deleteDocument = (id) => {
        confirmAlert({
            title: `${element.title}`,
            message: '¿Estás segur@ de borrar este documento?',
            buttons: [
                {
                    label: 'Borrar',
                    onClick: () => {
                        documentService.deleteDocument(id).then((result) => {
                            window.location.reload();
                        });
                    }
                },
                {
                    label: 'Cancelar',
                    onClick: () => {

                    }
                }
            ]
        });

    }

    const toggleDoc = () => {
        setDropdownDocOpen(!dropdownDocOpen);
    }

    const toggleEditDocModal = (id) => {
        setDropdownEditDoc(!dropdownEditDoc);
        setEditDocId(id);
    }

    const toggleShareDocModal = (document) => {
        setDropdownShareDoc(!dropdownShareDoc);
        setShareDoc(document);
    }

    const handleChangeEditDocName = (event) => {
        const { name, value } = event.target;
        setDocName(value);
    }

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const saveDocument = async () => {

        if(selectedFile === undefined){
            setAlertFile(true);
        }

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "file0",
            selectedFile,
        );

        formData.append(
            "title",
            docName,
        );

        toggleEditDocModal();
        return await documentService.editDocument(editDocId, formData).then((result) => {
            window.location.reload();
        });

    }

    const deleteNotification = (notification) => {
        confirmAlert({
            title: `${notification.title}`,
            message: '¿Estás segur@ de borrar esta notificación?',
            buttons: [
                {
                    label: 'Borrar',
                    onClick: () => {
                        notificationService.deleteNotification(notification._id).then((result) => {
                            console.log('result delete notification', result);
                            window.location.reload();
                        });
                    }
                },
                {
                    label: 'Cancelar',
                    onClick: () => {

                    }
                }
            ]
        });
    }

    const openNotification = (notification) => {
        setNotificationOpen(!notificationOpen);
        console.log('notification', notification);
    }

    const closeNotification = (notification) => {
        setNotificationOpen(!notificationOpen);
        if(!notification.read) {
            notificationService.markAsRead(notification._id).then((result) => {
                console.log('result', result)
                window.location.reload();
            })
        }
    }

    const checkSelected = (target) => {
        if (teachersSelected.includes(target)) {
            let i = teachersSelected.indexOf(target);
            teachersSelected.splice(i, 1);
        } else {
            teachersSelected.push(target)
        }
        console.log('teachersSelected', teachersSelected)
    }

    const shareDocument = async () => {
        if (teachersSelected.length > 0) {
            return await documentService.shareDocument(element._id, teachersSelected).then((result) => {
                console.log('result shared document', result);
            })

        } else {
            setShowRedText(true);
        }
        toggleShareDocModal();
    }

  return (
    <Col xs={'6'} sm={'8'} md={'12'} lg={'12'} xl={'12'} className="mb-5">
        {alertFile &&
        <UncontrolledAlert color={'danger'} className={'font'}>
            Es necesario que se elija un PDF para editarlo.
        </UncontrolledAlert>
        }
      <ContextMenuTrigger id="menu_id" data={element.id}>
        <Card style={ !notifications ? { width: '1000px', height: '90px', fontSize: '16px',
         justifyContent: 'center', padding: '20px', boxShadow: '1px #d4d4d4', borderRadius: '10px'} : notifications && !element.read && !notificationOpen ?
            { width: '1000px', height: '90px', fontSize: '16px',
                justifyContent: 'center', padding: '20px', boxShadow: '1px #d4d4d4', borderRadius: '10px', background: '#ADD8E6'} :
            notifications && element.read && !notificationOpen ? { width: '1000px', height: '90px', fontSize: '16px',
                justifyContent: 'center', padding: '20px', boxShadow: '1px #d4d4d4', borderRadius: '10px' } : notifications && notificationOpen ?
                {  width: '1000px', height: '250px', fontSize: '16px',
                    justifyContent: 'center', padding: '10px', boxShadow: '1px #d4d4d4', borderRadius: '10px' } : { }
        }
          onClick={event => onCheckItem(event, element.id)}

        >

          {subjects &&
            <>
              <Row xs={'12'} sm={'12'} lg={'12'} xl={'12'} >
                <Col xs={'6'} sm={'6'} lg={'6'} xl={'6'}>
                  <p className="list-item-heading mb-1 truncate">
                    {element.title}
                  </p>
                </Col>


                {props.user.type === 'admin' ?
                <>
                 <Col xs={'2'} sm={'2'} lg={'2'} xl={'2'}>
                  <Link to={'/subject/details/' + element._id} className={'btn btn-primary'} style={{fontSize: '15px'}} >
                    Ver detalles
                  </Link>
                </Col>
                  <Col xs={'2'} sm={'2'} lg={'2'} xl={'2'}>
                    <button className={'btn-danger mt-1'} style={{height: '30px'}} onClick={() => deleteSubject(element)}>Borrar</button>
                  </Col>
                </>
                :(
                  <Col xs={'4'} sm={'4'} lg={'4'} xl={'4'}>
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
                    <Dropdown isOpen={dropdownDocOpen} toggle={toggleDoc}>
                        <DropdownToggle caret>
                            Opciones
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>
                                <a href={element.secure_url} id="enlaceVerPdf" target="_blank">
                                    Ver
                                </a>
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={() => toggleEditDocModal(element._id)}>
                                Editar
                            </DropdownItem>
                            <DropdownItem divider />
                            {props.user.type === 'alumn' &&
                                <>
                                    <DropdownItem onClick={() => toggleShareDocModal(element)}>
                                        Compartir
                                    </DropdownItem>
                                    <DropdownItem divider />
                                </>
                            }
                            <DropdownItem onClick={() => deleteDocument(element._id)}>
                                Borrar
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Col>

              </Row>

                {console.log('selectedFile', selectedFile)}
                {console.log('name', docName)}
                {dropdownEditDoc &&
                    <div>
                        <Modal isOpen={dropdownEditDoc} toggle={toggleEditDocModal} >
                            <ModalHeader>Editar documento</ModalHeader>
                            <ModalBody>
                                <Row>
                                    <Col xs={'12'}>
                                        <label className={'mt-2'} htmlFor='text'>Nombre del documento</label>
                                    </Col>
                                    <Col xs={'12'}>
                                        <input className={'mt-2 font'} id='text' required='true' type='text' name='docName' defaultValue={element.title} onChange={handleChangeEditDocName} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={'12'}>
                                        <label className={'mt-2'} htmlFor='text'>Suba un pdf</label>
                                    </Col>
                                    <Col xs={'12'}>
                                        <input className={'mt-2 font'} required='true' type='file' name='document' onChange={onFileChange} />
                                    </Col>
                                </Row>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={saveDocument}>Guardar</Button>{' '}
                                <Button color="secondary" onClick={toggleEditDocModal}>Cancelar</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                }

                {dropdownShareDoc &&
                <div>
                    <Modal isOpen={dropdownShareDoc} toggle={toggleShareDocModal} >
                        <ModalHeader>Compartir documento</ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col xs={'12'}>
                                    <h1 className={'mt-4 mb-4'}>Profesores</h1>
                                </Col>
                            </Row>
                            {showRedText &&
                                <Row>
                                    <Col xs={'12'}>
                                        <h4 style={{color: 'red'}}>
                                            *Por favor, selecciona uno o más profesores
                                        </h4>
                                    </Col>
                                </Row>
                            }
                            <Row>
                                {teachers &&
                                    teachers.map((teacher) => {
                                        return <Row xs={'12'} sm={'12'} md={'12'} lg={'12'} className={'mb-5 ml-4'}>
                                            <CustomInput
                                                type="checkbox"
                                                name=""
                                                id={teacher._id}
                                                value={teacher.firstName}
                                                onChange={(e) => checkSelected(e.target.id)}
                                                label={teacher.firstName}
                                            />
                                        </Row>
                                    })
                                }
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={shareDocument}>Guardar</Button>{' '}
                            <Button color="secondary" onClick={toggleShareDocModal}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                </div>

                }
            </>
          }

            {notifications && !notificationOpen ? (
            <>
                <Row xs={'12'} sm={'12'} md={'12'} lg={'12'} xl={'12'} >
                    <Col xs={'6'} sm={'6'} lg={'6'} xl={'6'}>
                        <p className="list-item-heading mb-1 truncate">
                            {element.title}
                        </p>
                    </Col>

                    <Col xs={'2'} sm={'2'} lg={'2'} xl={'2'}>
                        <button className={'btn btn-primary'} style={{fontSize: '12px'}}  onClick={() => openNotification(element)}>
                            Ver detalles
                        </button>
                    </Col>
                    <Col xs={'2'} sm={'2'} lg={'2'} xl={'2'}>
                        <button className={'btn btn-primary'} style={{fontSize: '12px', backgroundColor: 'red', border: 'none'}} onClick={() => deleteNotification(element)}>
                            Borrar
                        </button>
                    </Col>

                </Row>
            </>
            ) : notifications && notificationOpen ? (
                <>
                    <Row xs={'12'} sm={'12'} md={'12'} lg={'12'} xl={'12'} className={'justify-content-center'}>
                        <Col xs={'6'} md={'8'} sm={'8'} lg={'12'} xl={'12'}>
                            <p className="list-item-heading truncate">
                                {element.title}
                            </p>
                        </Col>

                    </Row>
                    <Row className={'mt-5'}>
                        <Col xs={'6'} md={'8'} sm={'12'} lg={'12'} xl={'12'}>
                            <p className="list-item-heading truncate">
                                {element.content}
                            </p>
                        </Col>
                    </Row>
                    <Row className={'justify-content-center mt-5'}>
                        <Col xs={'2'} sm={'2'} lg={'2'} xl={'2'}>
                            <button className={'btn btn-primary'} style={{fontSize: '12px'}}  onClick={() => closeNotification(element)}>
                                Ocultar detalles
                            </button>
                        </Col>
                    </Row>
                </>
                ) : ( <></> )
            }

        </Card>
      </ContextMenuTrigger>
    </Col>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(withRouter(withAuth(DataListView)));
