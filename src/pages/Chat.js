/** @jsx jsx */
import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';

import Header from 'components/Header';
import Message from 'components/elements/message';
import withAuth from 'components/withAuth';

import chatService from 'services/chat-service'

const URL = 'http://localhost:3800/';

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
    const [socket] = useState(io(URL))
    const inputRef = useRef();
    const [messages, setMessages] = useState([]);
    const [form, setForm] = useState({ message: ''})
    const [chat, setChat] = useState();

    useEffect(() => {

        
        chatService.getChat(idDelChat/* react-router-dom useLocation()*/ ).then(chatFromApi => {
            /*hago esto una vez tengo el chat */
            socket.on("message_receive", data => {
            setMessages(old => [...old, data])
        });
        setChat(chatFromApi)

        })
    }, [])

    useEffect(() => {
        setMessages(chat.messages)
    }, [chat])

    const handleSendMessage = () => {
        const message = { owner: user._id , text: form.message }
        socket.emit('message_send', message);
        setMessages(oldMessages => [...oldMessages, message]);
        setForm({ message: ''})
        chatService.postMessage()
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


    return (
        
            <div className="chat">
                <Header/>
                <ChatWrapper>
                    <MessagesWrapper>
                        {messages && messages.map((message, index) => (
                            <Message key={index} message={message.text} owner={message.owner} />
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