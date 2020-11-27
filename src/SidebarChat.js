import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setChat } from "./features/chatSlice";
import "./SidebarChat.css";
import db from './features/firebase';


function SidebarChat({id, chatName}) {

    const dispatch = useDispatch();

    const [chatInfo, setChatInfo] = useState();
    
    

    const setChatPane = () => {
        dispatch(
            setChat({
                chatId: id,
                chatName: chatName
            })
        )

    }

    useEffect(() => {
        db.collection("chats").doc(id).collection("messages").orderBy("timestamp", "asc").onSnapshot(snapshot =>
            setChatInfo(snapshot.docs.map(doc => doc.data())));
    }, [id])
    
    return (
        <div 
            onClick={setChatPane}
        className="sidebarChat">
            <Avatar /*src={chatInfo[0]?.photo} then for <p> chatInfo.message, then new 
            Date(chatInfo[0]?.timestamp?.toDate()).toLocaleString()*/ />
            <div className="sidebarChat__info">
                <h3>{chatName}</h3>
                <p>HactuallyChat</p>
                <small>Click to chat</small>
            </div>
        </div>
    );
}

export default SidebarChat;