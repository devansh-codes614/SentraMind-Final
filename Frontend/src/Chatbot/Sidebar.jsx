// Sidebar.jsx
import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>SentraMind</h2>
        <p className="sidebar-subtitle">
          Your safe space to write and reflect.
        </p>
      </div>

      <div className="sidebar-content">
        <h4>Journaling Ideas</h4>
        <ul>
          <li>How was your day today?</li>
          <li>Something that made you smile</li>
          <li>A challenge you're facing</li>
          <li>One small goal for tomorrow</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
