import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import Chat from "./Chat.jsx";
import "./styles.css";

const users = [
    { id: 1, name: "Jack", avatar: "https://i.pravatar.cc/50?img=7" },
    { id: 2, name: "Anna", avatar: "https://i.pravatar.cc/50?img=2" },
    { id: 3, name: "Mickey", avatar: "https://i.pravatar.cc/50?img=3" },
    { id: 4, name: "Isabella", avatar: "https://i.pravatar.cc/50?img=9" },
];

const defaultMessages = {
    1: [{ text: "Hey, how are you?", sender: "them" }],
    2: [{ text: "Hi, what's up?", sender: "them" }],
    3: [{ text: "Let's discuss business!", sender: "them" }],
    4: [{ text: "Yo bro!", sender: "them" }],
};

export default function App() {
    const [selectedUser, setSelectedUser] = useState(users[0]);
    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem("chatMessages");
        return savedMessages ? JSON.parse(savedMessages) : defaultMessages;
    });

    useEffect(() => {
        localStorage.setItem("chatMessages", JSON.stringify(messages));
    }, [messages]);

    const sendMessage = (userId, newMessage) => {
        const updatedMessages = {
            ...messages,
            [userId]: [...messages[userId], { text: newMessage, sender: "me" }],
        };
        setMessages(updatedMessages);

        const autoReplies = {
            "how are you": "Good, thanks!",
            "hello": "Hey there!",
            "what's up": "Not much, you?",
            "bye": "Goodbye! Have a great day!",
        };


        const normalizedMessage = newMessage.trim().toLowerCase();


        const reply = autoReplies[normalizedMessage] || "Okay";


        setTimeout(() => {
            const updatedMessagesWithReply = {
                ...updatedMessages,
                [userId]: [
                    ...updatedMessages[userId],
                    { text: reply, sender: "them" },
                ],
            };
            setMessages(updatedMessagesWithReply);
        }, 1000);
    };

    return (
        <div className="chat-container">
            <Sidebar users={users} setSelectedUser={setSelectedUser} />
            <Chat selectedUser={selectedUser} messages={messages[selectedUser.id]} sendMessage={sendMessage} />
        </div>
    );
}
