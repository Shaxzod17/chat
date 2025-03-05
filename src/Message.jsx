import React from "react";

const Message = ({ text, sender }) => {
    return (
        <div className={`messages ${sender === "me" ? "sent" : "received"}`}>
            {text}
        </div>
    );
};

export default Message;
