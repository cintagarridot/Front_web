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
        // console.log(data.teachers)
        // list.push(data.teachers);
        setList(data.teachers);
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
    const { user } = props;
    let chatsNews = [];
    let otherUsersList = [];


    // await userService.getUserChats(user._id).then((chats) => {
    //   setUserChats(chats);
    //   chatsNews = chats;
    //   console.log('chatsNews', chatsNews);
    // });

    setUserChats(user.chats);
    chatsNews = chats;
    console.log('userChats', user.chats)
    console.log('chatsNews', chatsNews);

    if(user.chats.length > 0) {
      Promise.all(user.chats.forEach(async (chat, index) => {
        console.log('chat', chat);
        const c = await chatService.getChat(chat);
        console.log('c', c);
        c.users.forEach(async (u) => {
          if (u._id === user._id) {
              console.log('other user ===', u);
          } else {
              console.log('other user !==', u);
              await userService.getOneUser(u).then((data) => {
                  if(data.usuario.username !== user.username) {
                    console.log('data.usuario.username', data.usuario.username)
                    const obj = {
                      idChat: c._id,
                      otherUser: data.usuario.firstName + ' ' + data.usuario.lastName,
                      username: data.usuario.username,
                      otherUserId: data.usuario._id,
                    }
                    console.log('obj', obj);
                    otherUsersList.push(obj);
                  }                        
              });
              
          }
          console.log('index', index);
          console.log('chatsNews.length', chatsNews.length);
          if(index === user.chats.length - 1) {
            console.log('otherUserList dentro', otherUsersList);
            console.log('otherUsersList dentro .length', otherUsersList.length);
            setOtherUsers(otherUsersList);
            setStatus('success');
          }
        });
      }));

    } else {
      setOtherUsers(otherUsersList);
      setStatus('success');
    }
      
    
    console.log('hola soy cinta9 jej')
  }

  const goBack = () => {
    setShowList(false);
  }

  return (
    <div>
      <Header />
      <h1 className="subheaderUser">Chats</h1>
        {!showList ? (
          <>
          {console.log('otherUsers.length render', otherUsers.length)}
          {console.log('status render', status)}
          {console.log('chat', props.user, otherUsers, status)}
            { props.user.chats && props.user.chats.length > 0 && status === 'success' ? (
              <div className="mt-5 pt-1">
                {otherUsers.map((user) => {
                  console.log('user otheruser', user)
                  return (
                    <DataListView
                        key={user._id}
                        element={user}
                        chats
                        auth={props.user}
                      />
                  );
                })}
                <button onClick={showUsersList} className={"btn btn-light"} style={{margin: 'auto', marginTop: '10px'}}>
                    Crea uno nuevo
                </button>
              </div>
            ) : !props.user.chats && props.user.chats.length === 0 && status === 'success' ? (
                <div className="noChatsSpace">
                  <h3>No tienes ningún chat</h3>
                  <button className={"btn btn-light"} onClick={showUsersList}>
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
                {list && list.length > 0 &&
                  list.map((l) => {
                    console.log('l', l)
                    const found = otherUsers.find((oth) => oth.username === l.username)
                    console.log('found', found);
                    if(!found){
                      return ( <DataListView
                        key={l._id}
                        element={l}
                        newChat
                        auth={props.user}
                        createNewChatMethod={createNewChat}
                      /> );
                    }
                  }) 
                }
                  

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