// Chatbot.jsx
import "./Chatbot.css";
import React from "react";
import Main from "./Main";
import Sidebar from "./Sidebar";

const Chatbot = () => {
  return (
    <div className="chatbot">
      <Sidebar />
      <Main />
    </div>
  );
};

export default Chatbot;
