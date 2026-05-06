import "./Main.css";
import React, { useState, useRef, useEffect } from "react";
import api from "../apiClient";

const formatTime = (iso) => {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const Main = ({ activeChat, updateChatMessages }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  const messages = activeChat?.messages || [];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || !activeChat || loading) return;

    const userMsg = {
      id: Date.now(),
      role: "user",
      text,
      time: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMsg];
    updateChatMessages(activeChat.id, updatedMessages, text);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/api/chat", {
        threadId: activeChat.id.toString(),
        message: text,
      });

      const aiMsg = {
        id: Date.now() + 1,
        role: "ai",
        text: res?.data?.reply ?? "No reply returned.",
        time: new Date().toISOString(),
      };

      updateChatMessages(activeChat.id, [...updatedMessages, aiMsg], text);
    } catch (err) {
      console.error("CHAT ERROR:", err.response?.data || err.message);

      const errorMsg = {
        id: Date.now() + 2,
        role: "ai",
        text: "Something went wrong. Please try again.",
        time: new Date().toISOString(),
      };

      updateChatMessages(activeChat.id, [...updatedMessages, errorMsg], text);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (text) => {
    setInput(text);
  };

  return (
    <div className="main">
      <div className="top">
        <p>Sentramind</p>
        <i className="fa-solid fa-user-doctor fa-3x"></i>
      </div>

      {messages.length === 0 ? (
        <div className="main-container">
          <div className="greet">
            <p><span>Hello, Friend</span></p>
            <p>Let’s talk, even if it’s just a little.</p>
          </div>

          <div className="cards">
            <div
              className="card"
              onClick={() =>
                handleSuggestionClick("I want to share something I'm grateful for today.")
              }
            >
              <p>Share something you’re grateful for today</p>
              <i className="fa-solid fa-person-praying fa-2x"></i>
            </div>

            <div
              className="card"
              onClick={() => handleSuggestionClick("Right now I am feeling...")}
            >
              <p>How are you feeling right now?</p>
              <i className="fa-solid fa-dove fa-2x"></i>
            </div>

            <div
              className="card"
              onClick={() =>
                handleSuggestionClick("Recently I faced a challenge where...")
              }
            >
              <p>Write about a recent challenge</p>
              <i className="fa-solid fa-peace fa-2x"></i>
            </div>

            <div
              className="card"
              onClick={() =>
                handleSuggestionClick("A positive memory that makes me smile is...")
              }
            >
              <p>A positive memory that makes you smile</p>
              <i className="fa-solid fa-hand-peace fa-2x"></i>
            </div>
          </div>
        </div>
      ) : (
        <div className="messages-list" aria-live="polite">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`message-row ${m.role === "user" ? "user" : "ai"}`}
            >
              <div className="bubble">
                <div className="bubble-text">{m.text}</div>
                <div className="bubble-time">{formatTime(m.time)}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="message-row ai">
              <div className="bubble typing">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            </div>
          )}

          <div ref={endRef} />
        </div>
      )}

      <div className="main-bottom">
        <div className="search-box">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter your message here"
            rows={1}
            style={{ overflow: "hidden" }}
          />

          <div className="icon-container">
            <button onClick={handleSend} disabled={loading} type="button">
              {loading ? "Thinking..." : <i className="fa-solid fa-arrow-right fa-2x"></i>}
            </button>
          </div>
        </div>

        <p className="bottom-info">
          Sentramind supports emotional well-being but does not replace mental
          health professionals.
        </p>
      </div>
    </div>
  );
};

export default Main;