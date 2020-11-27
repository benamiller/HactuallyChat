import React from "react";
import "./HactuallyChat.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";

function HactuallyChat() {
    return <div className="hactuallychat">
    {/* Sidebar */}
    <Sidebar />
    {/* Chat */}
    <Chat />
    </div>
}

export default HactuallyChat;