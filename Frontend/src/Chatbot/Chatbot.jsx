import "./Chatbot.css";
import React, { useState } from "react";
import Main from "./Main";
import Sidebar from "./Sidebar";

const Chatbot = () => {
  const [chats, setChats] = useState([
    {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    },
  ]);

  const [activeChatId, setActiveChatId] = useState(chats[0].id);
  const [searchTerm, setSearchTerm] = useState("");

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    };

    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

  const deleteChat = (chatId) => {
    const updatedChats = chats.filter((chat) => chat.id !== chatId);

    if (updatedChats.length === 0) {
      const newChat = {
        id: Date.now(),
        title: "New Chat",
        messages: [],
      };
      setChats([newChat]);
      setActiveChatId(newChat.id);
    } else {
      setChats(updatedChats);

      if (activeChatId === chatId) {
        setActiveChatId(updatedChats[0].id);
      }
    }
  };

  const updateChatMessages = (chatId, newMessages, firstMessage = null) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              title:
                chat.messages.length === 0 && firstMessage
                  ? firstMessage.slice(0, 25)
                  : chat.title,
              messages: newMessages,
            }
          : chat
      )
    );
  };

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chatbot">
      <Sidebar
        chats={filteredChats}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        createNewChat={createNewChat}
        deleteChat={deleteChat}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <Main
        activeChat={activeChat}
        updateChatMessages={updateChatMessages}
      />
    </div>
  );
};

export default Chatbot;