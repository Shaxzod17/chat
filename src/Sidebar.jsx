import React, { useState } from "react";

const Sidebar = ({ users, setSelectedUser }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="sidebar">
            <input
                type="text"
                placeholder="Search"
                className="search-bar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredUsers.map((user) => (
                <div key={user.id} className="user" onClick={() => setSelectedUser(user)}>
                    <img src={user.avatar} alt={user.name} className="avatar" />
                    <div className="user-info">
                        <p className="user-name">{user.name}</p>
                        <p className="user-status">{user.lastMessage || "Last seen recently"}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
