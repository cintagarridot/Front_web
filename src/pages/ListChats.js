import React, { useEffect, useState, useMemo } from 'react';
import { ListGroup, ListGroupItem, Spinner } from 'reactstrap';

import chatService from 'services/chat-service';
import userService from 'services/user-service';
import Header from 'components/Header';
import withAuth from 'components/withAuth';
import { Redirect, Link } from 'react-router-dom';
import DataListView from 'components/DataListView';

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
  const [status, setStatus] = useState(null);

  const [otherUsers, setOtherUsers] = useState([]);

  useEffect(() => {
    let otherUsersList = [];

    /*const usersChat =*/
    getUserChatsAction();

    // usersChat.map((chat) => {
    //   console.log('chat', chat);
    //   const otherUserFilteredId = chat.users && chat.users.filter((e) => e._id !== props.user._id)
    //   chatService.getOtherUser(otherUserFilteredId).then((data) => {
    //     console.log('data other user', data);
    //     const obj = {
    //       idChat: chat._id,
    //       otherUser: data.firstName + ' ' + data.lastName,
    //     }
    //     console.log('obj', obj);
    //     otherUsersList.push(obj);
    //   });
    // });

    // console.log('otherUsersList', otherUsersList);
    // setOtherUsers(otherUsersList);   

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
        setStatus('success');
      })
    }

    else {
      await userService.getAlumnsList().then(data => {
        setList(data.alumns);
        setShowList(true);
        setStatus('success');
      })
    }


  }

  const getUserChatsAction = async () => {
    const { user } = props;
    let chatsNews = [];
    let otherUsersList = [];


    await userService.getUserChats(user._id).then((chats) => {
      setUserChats(chats);
      chatsNews = chats;
      console.log('chatsNews', chatsNews);
    });

    const list = await chatsNews.map(async (chat) => {
      console.log('chat', chat);
      await chat.users.forEach(async (u) => {
        if (u._id === user._id) {
            console.log('other user ===', u);
        } else {
            console.log('other user !==', u);
            await userService.getOneUser(u).then((data) => {
                if(data.usuario.username !== user.username) {
                  console.log('data.usuario.username', data.usuario.username)
                  const obj = {
                    idChat: chat._id,
                    otherUser: data.usuario.firstName + ' ' + data.usuario.lastName,
                  }
                  console.log('obj', obj);
                  otherUsersList.push(obj);
                  return otherUsersList;
                }                        
            })
            return otherUsersList;
        }
        return otherUsersList;
      });
      return otherUsersList;
    });
    console.log('list chat', list);
    Promise.all(list).then((l) => {
      console.log('otherUsersList', otherUsersList);
      setOtherUsers(otherUsersList); 
      setStatus('success');
    });

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
      <h1 className="subheaderUser">Chats recientes</h1>
        {!showList ? (
          <>
          {console.log('condition chat', props.user.chats && props.user.chats.length > 0 && otherUsers.length > 0 && status === 'success')}
          {console.log('chat', props.user, otherUsers, status)}
            { props.user.chats && props.user.chats.length > 0 && otherUsers.length > 0 && status === 'success' ? (
              <div className="subheaderSpace">
                {otherUsers.map((user) => {
                  return (
                    <DataListView
                        key={user._id}
                        element={user}
                        chats
                        onCheckItem={this.onCheckItem}
                      />
                  );
                })}
                {/* <ListGroup  style={{ fontSize: '25px' }}>
                  { otherUsers.map((user) => {
                    console.log('user render', user);
                    return <Link to={`/chat/${user.idChat}`}>
                      <ListGroupItem tag="a" style={{ color: 'black', textDecoration: 'none', cursor: 'pointer' }}>{user.otherUser}</ListGroupItem>
                    </Link>
                  })}
                </ListGroup> */}
                <button onClick={showUsersList} style={{float: 'right', marginTop: '10px'}}>
                    Crea uno nuevo
                </button>
              </div>
            ) : !props.user.chats && props.user.chats.length === 0 && otherUsers.length === 0 && status === 'success' ? (
                <div className="noChatsSpace">
                  <h3>No tienes ningún chat</h3>
                  <button onClick={showUsersList}>
                    Crea uno
                </button>
                </div>
              ) : (
                <Spinner color="info" />
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