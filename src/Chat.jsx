import React, { useState } from "react";
import Message from "./Message.jsx";

const Chat = ({ selectedUser, messages, sendMessage }) => {
    const [newMessage, setNewMessage] = useState("");

    const handleSend = () => {
        if (newMessage.trim()) {
            sendMessage(selectedUser.id, newMessage);
            setNewMessage("");
        }
    };

    return (
        <div className="chat-window">
            <div className="chat-header">
                <img src={selectedUser.avatar} alt={selectedUser.name} className="chat-avatar" />
                <h3>{selectedUser.name}</h3>
            </div>

            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender === "me" ? "sent" : "received"}`}>
                        {msg.sender !== "me" && (
                            <img src={selectedUser.avatar} alt={selectedUser.name} className="message-avatar" />
                        )}
                        <Message text={msg.text} sender={msg.sender} />
                    </div>
                ))}
            </div>

            <div className="chat-input">
                <input
                    className="chat-input"
                    type="text"
                    placeholder="Message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
