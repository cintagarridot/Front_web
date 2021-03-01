/** @jsx jsx */
import React, { useEffect, useState, useRef } from 'react';
// import io from 'socket.io-client';
import Websocket from 'react-websocket';

import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';

import Header from 'components/Header';
import Message from 'components/elements/message';
import withAuth from 'components/withAuth';

import chatService from 'services/chat-service'

import { useHistory, useLocation } from 'react-router-dom';
const URL = 'wss://uhu-back.herokuapp.com/';
// const URL = 'ws://99.81.152.224';

/*css con emotion/styled NO SE USA EL JSX DE LA 1 LINEA */
const ChatWrapper = styled.div`
width: 100%;
height: 100vh;
display: flex;
justify-content: space-between;
flex-direction: column;
padding-top: 100px;
font-size: 16px;
`
const MessagesWrapper = styled.div`
width: 100%;
height: 90%;
display: flex;
overflow-y: scroll;
background: white;
flex-direction: column;
justify-content: flex-end;
box-sizing: border-box;
`

const Chat = ({user, ...props}) => {
    // const [socket] = useState(io(URL, {
    //     withCredentials: true,
    //     extraHeaders: {
    //         "Access-Control-Allow-Headers": "Content-Type, Authorization"
    //     }
    // }))

    // const [socket] = useState(io(URL, {
    //     withCredentials: true,
    //     transportOptions: {
    //         polling: {
    //             extraHeaders: {
    //                 "Access-Control-Allow-Headers": "Bearer test, Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    //             }
    //         }
    //     }
    // }));

  //  console.log('socket after useState', socket);

    const inputRef = useRef();
    const [messages, setMessages] = useState([]);
    const [form, setForm] = useState({ message: ''})
    const [chat, setChat] = useState();
    const socket = useRef();

    useEffect(() => {
        let paths = window.location.href.split('/');
        let chatId = paths[paths.length-1];
        console.log('chatId', chatId)
        chatService.getChat(chatId).then(chatFromApi => {
            console.log('chatFromApi')
            console.log(chatFromApi)
            const data = chatFromApi.messages;

            // socket.on("connect", () => {
            // socket.io.connect();
            // console.log('socket connect front', socket.id); 
            // });


            // socket.io.on("message_receive", (data)  => {
            //     console.log('data')
            //     console.log(data)
            //     setMessages(old => [...old, data])
            // });
            setChat(chatFromApi);
            setMessages(chatFromApi.messages);
            const dataJoin = { 
                room: chatFromApi._id,
                join: chatFromApi.users
            }
            socket.current.sendMessage(JSON.stringify(dataJoin));    
        })
    }, [])

    const handleSendMessage = () => {
        const message = { owner: user._id , text: form.message }
        // socket.emit('message_send', message);
        console.log('message', message)
        
        if(message.text !== ''){
            socket.current.sendMessage(JSON.stringify(message));
            setMessages(oldMessages => [...oldMessages, message]);

            let paths = window.location.href.split('/');
            let chatId = paths[paths.length-1];
            chatService.postMessage(message, chatId);

            setForm({ message: ''});
        }
    }

    const handleChange = e => {
        const { value, name } = e.target;
        setForm(old => ({...old, [name]: value}))
    }

    const handleSubmit = (e) => {
        if (e.keyCode === 13) {
            handleSendMessage()
        }
    }

    const receiveMessage = (message) => {

        const parseMessage = JSON.parse(message);
        const parsed2 = JSON.parse(parseMessage);

        setMessages([...messages, parsed2]);

        console.log('MESSAGES TOTAL', messages);
    }


    return (

            <div className="chat">
                <Header/>
                <Websocket 
                  onOpen={() => console.log('websocket client connected')}
                  url={URL}
                  onMessage={(e) => receiveMessage(e)}
                  onClose={() => console.log('websocket client disconnected')}
                  reconnect={true}
                  ref={socket}
                />
                <ChatWrapper>
                    <MessagesWrapper>
                        {messages && messages.map((message, index) => (
                           <>
                            {console.log('message')}
                            {console.log(message)}

                            <Message key={index} message={message.text} owner={message.owner} />
                            </>
                        ))}
                    </MessagesWrapper>

                    <div css={css`display: flex; width: 100%; align-items: center`}>
                        <input css={css`
                        padding: 20px; 
                        margin: 10px;
                        width: 100%;
                        &:hover{
                            border: 2px solid #ff0;
                        }
                        `
                        }
                        name="message"
                        ref={inputRef}
                        value={form.message}
                        onKeyUp={handleSubmit}
                        onChange={handleChange} /> {/*css con emotion/core hayque usar JSX de la 1 linea */}
                        <button className="btn btn-primary" onClick={handleSendMessage}>Enviar</button>
                    </div>

                </ChatWrapper>

                <div className="clearfix"></div>
            </div>

    )
}

export default withAuth(Chat);
