import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Authentication/AuthProvider";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navbar-links_logo">
        <Link to="/">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
            alt="logo"
          />
        </Link>
      </div>

      <div className="navbar-links_container">
        <p><Link to="/">Home</Link></p>
        <p><Link to="/chatbot">Chatbot</Link></p>
        <p><Link to="/posts">Posts</Link></p>
        <p><Link to="/news">News</Link></p>
        <p><Link to="/dashboard">Dashboard</Link></p>
      </div>

      <div className="navbar-sign">
        {!user ? (
          <>
            <Link to="/login">
              <button type="button">Login</button>
            </Link>

            <Link to="/signup">
              <button type="button">Sign Up</button>
            </Link>
          </>
        ) : (
          <button type="button" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;