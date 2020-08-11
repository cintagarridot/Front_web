import React, { useEffect, useState } from 'react'
import chatService from 'services/chat-service'
import Header from 'components/Header';

const ListChats = () => {
  // fetch a chatService.getChatsByUser, pintar la lista que devuelva
  const [ chats, setChats ] = useState([]);
  

  useEffect (() => {
    chatService.getChatsByUser().then(data =>{
      console.log('dentro del then del listChats')
      console.log(data)
      setChats(data);
      console.log('chats')
      console.log(chats)
    })
  }, [chats])

  // cuando selecciones un alumno debes de crear un chat con el usuario destinatario y el usuario del currenUser,
  // cuando tengas el chat (en el .then), navegas a /chat/:id

const getOtherUser = (users) => {  // POR SI NO SE PUEDE USAR FILTER EN EL RENDER COGER EL OTRO ID DEL OTRO USUARIO QUE NO SOY YO
  return users.filter(user => user !== user.id)
}
  return(
    <div>
      <Header/>
      {chats && chats.length > 0 &&
        chats.map(chat => {
        return (<link to={`/chat/${chat.id}`}>{getOtherUser}</link> /*que el id del usuario no sea el tuyo, asi sacas el nombre del otro user*/
        );
      }
      
      )
      }
     
      </div>  
  )
}

export default ListChats;