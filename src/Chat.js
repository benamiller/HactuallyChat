import { IconButton } from '@material-ui/core';
import MicNoneIcon from '@material-ui/icons/MicNone';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./Chat.css";
import { selectChatId, selectChatName } from './features/chatSlice';
import db from "./features/firebase";
import Message from "./Message";
import firebase from 'firebase';
import { selectUser } from './features/userSlice';
import { useRef } from 'react';

function Chat() {

    const myRef = useRef(null);
    const user = useSelector(selectUser);
    const [input, setInput] = useState("");
    const chatName = useSelector(selectChatName);
    const [messages, setMessages] = useState([]);
    const chatId = useSelector(selectChatId);

    const executeScroll = () => {
        
        myRef.current.scrollIntoView();
    }
    
    useEffect(() => {
        if(chatId) {
            db.collection("chats")
            .doc(chatId)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) => 
                setMessages(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))                
                )
            );
            executeScroll();
        }

    }, [chatId]);

    

    const sendMessage = (e) => {
        e.preventDefault();

        if (input) {
            db.collection("chats").doc(chatId).collection("messages")
            .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                uid: user.uid,
                photo: user.photo,
                email: user.email,
                displayName: user.displayName,
            });
        }   
        setInput("");
        executeScroll();
    };

    

    return (
        <div className="chat">
            
            <div className="chat__header">
                <h4>To: <span className="chat__name">{chatName}</span></h4>
                <strong>Details</strong>
            </div>

            <div onClick={executeScroll} className="chat__messages">
                {messages.map(({id, data}) => (
                    <Message key={id} contents={data} />
                ))}
                <div className="chat__dummy" id="chat__dummy" ref={myRef}></div>
            </div>

            

            <div onClick={executeScroll} className="chat__input">
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} 
                    placeholder="HactualMessage" type="text" />
                    <button onClick={sendMessage}>Send Message</button>
                </form>

                <IconButton>
                    <MicNoneIcon className="chat__mic"/>
                </IconButton>
                

            </div>


        </div>
    )
}

export default Chat;