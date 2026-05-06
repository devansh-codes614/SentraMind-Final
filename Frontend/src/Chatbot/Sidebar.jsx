import React from "react";
import "./Sidebar.css";

const Sidebar = ({
  chats,
  activeChatId,
  setActiveChatId,
  createNewChat,
  deleteChat,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>SentraMind</h2>
      </div>

      <button className="new-chat-btn" onClick={createNewChat}>
        + New Chat
      </button>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Chat"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="sidebar-content">
        <h4>Chat History</h4>

        <div className="chat-history">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${activeChatId === chat.id ? "active" : ""}`}
            >
              <span className="chat-title" onClick={() => setActiveChatId(chat.id)}>
                {chat.title}
              </span>

              <button
                className="delete-btn"
                onClick={() => deleteChat(chat.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;