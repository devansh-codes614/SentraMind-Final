// Frontend/src/Authentication/Signup.jsx
import { useState } from "react";
import "./login.css";
import sun from "../assets/sun.png";
import kid from "../assets/kid.jpg";
import api from "../apiClient";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending signup data:", formData);

      // ✅ ye request jayegi: POST https://sentramind-backend.onrender.com/signup
      const res = await api.post("/signup", formData);

      alert(res.data.message || "Signup successful!");
      window.location.href = "/"; // home/dashboard
    } catch (err) {
      console.error(
        "SIGNUP FRONTEND ERROR:",
        err.response?.data || err.message
      );

      if (err.response) {
        alert(err.response.data.message || "Signup failed (server error)");
      } else {
        alert("Signup failed (network error)");
      }
    }
  };

  return (
    <div className="login-main">
      <div className="login-left signup-img">
        <img src={kid} alt="img" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={sun} alt="logo" />
          </div>
          <div className="login-center">
            <h2>Welcome!</h2>
            <p>Please enter your details to create an account</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
              />
              <div className="pass-input-div">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="login-center-buttons">
                <button className="btn" type="submit">
                  Sign Up
                </button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Already have an account? <a href="/login">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
