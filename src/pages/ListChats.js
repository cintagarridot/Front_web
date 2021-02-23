import React, { useEffect, useState, useMemo } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

import chatService from 'services/chat-service';
import userService from 'services/user-service';
import Header from 'components/Header';
import withAuth from 'components/withAuth';
import { Redirect, Link } from 'react-router-dom';

const ListChats = (props) => {
  // fetch a chatService.getChatsByUser, pintar la lista que devuelva
  const [chats, setChats] = useState([]);
  const [list, setList] = useState([]);
  const [showList, setShowList] = useState(false);
  const [redirectToChat, setRedirectToChat] = useState(false);
  const [idChat, setIdChat] = useState('');
  const [userChats, setUserChats] = useState([]);
  const [otherUser, setOtherUser] = useState();
  const [chat, setChat] = useState();

  const [otherUsers, setOtherUsers] = useState({
    idChat: '',
    otherUser: '',
  });

  useEffect(() => {
    console.log('props');
    console.log(props)
    getUserChatsAction();
  }, []);

  const createNewChat = (otherId) => {
    //coger mi id desde las props y el otherId es del usuario que pincho en la lista para crear un nuevo chat.
    const { _id: myId } = props.user;
    console.log(myId)
    console.log(otherId)
    chatService.createChat(otherId).then(({ data }) => {
      console.log('ha creado el chat')
      console.log(data)
      setIdChat(data._id);
      setRedirectToChat(true);
    })
  }

  const showUsersList = async () => {
    const { user } = props;

    if (user.type === 'alumn') {
      await userService.getTeachersList().then(data => {
        console.log(data.teachers)
        list.push(data.teachers);
        setList(...list);
        console.log(list)
        setShowList(true);
      })
    }

    else {
      await userService.getAlumnsList().then(data => {
        setList(data.alumns);
        setShowList(true);
      })
    }


  }

  const getUserChatsAction = async () => {
    const user = props.user;
    let otherUsersList = [];

    console.log('entra en getUserChatsAction');
    debugger;
    await userService.getUserChats(user._id).then((chats) => {
      setUserChats(chats);
      console.log('userChats', userChats);
      chats.map(async (chat) => {
        console.log('chat', chat);
        const otherUserFilteredId = chat.users && chat.users.filter((e) => e._id !== props.user._id)
        await chatService.getOtherUser(otherUserFilteredId).then((data) => {
          console.log('data other user', data);
          const obj = {
            idChat: chat._id,
            otherUser: data.firstName + ' ' + data.lastName,
          }
          console.log('obj', obj);
          otherUsersList.push(obj);
        });
      });
    });

    console.log('otherUsersList', otherUsersList);
    setOtherUsers(otherUsersList);   
  }


  // const getOtherUserAction = useMemo(() => {  // POR SI NO SE PUEDE USAR FILTER EN EL RENDER COGER EL OTRO ID DEL OTRO USUARIO QUE NO SOY YO
    
  //   console.log('chat', chat);
  //   const otherUserFilteredId = chat.users && chat.users.filter((e) => e._id !== props.user._id)

  //   console.log('otherUserFilteredId', otherUserFilteredId);
  //     chatService.getOtherUser(otherUserFilteredId).then((data) => {
  //       console.log('data other user', data);
  //       setOtherUser(data.firstName + ' ' + data.lastName);
  //     });

  // }, [props.user.chats]);

  const goBack = () => {
      setShowList(false);
  }

  return (
    <div>
      <Header />
      <h1 className="subheaderUser">Chats</h1>
      {!showList ? (
        <>
        {console.log(props.user)}
          { props.user.chats && props.user.chats.length > 0 && userChats.length > 0 ? (
            <div className="subheaderSpace">
              <h3>Chats recientes</h3>
              <ListGroup  style={{ fontSize: '25px' }}>
                { otherUsers && otherUsers.map(user => {
                  console.log('user render', user);
                  return <Link to={`/chat/${user.chatId}`}>
                    <ListGroupItem tag="a" style={{ color: 'black', textDecoration: 'none', cursor: 'pointer' }}>{user.otherUser}</ListGroupItem>
                  </Link>
                })}
              </ListGroup>
              <button onClick={showUsersList} style={{float: 'right', marginTop: '10px'}}>
                  Crea uno nuevo
              </button>
            </div>
          ) : (
              <div className="noChatsSpace">
                <h3>No tienes ningún chat</h3>
                <button onClick={showUsersList}>
                  Crea uno
              </button>
              </div>
            )
          }
        </>

      ) : (
        <div className={'subheaderSpace'}>
            <h2>Usuarios</h2>
            <ListGroup style={{ fontSize: '25px' }}>
              {list && list.length > 0 &&
                list.map(l => {
                  return <ListGroupItem tag="a" onClick={() => createNewChat(l._id)} style={{ color: 'black', textDecoration: 'none', cursor: 'pointer' }}>{l.firstName} {l.lastName}</ListGroupItem>
                })
              }

            </ListGroup>
            <button onClick={goBack} style={{float: 'right'}}>
                Atrás
            </button>
          </div>
        )

      }
      {redirectToChat &&
        <Redirect to={'/chat/' + idChat} />
      }

    </div>
  )
}

export default withAuth(ListChats);