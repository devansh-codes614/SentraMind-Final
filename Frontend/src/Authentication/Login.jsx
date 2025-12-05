import { useContext, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import sun from "../assets/sun.png";
import api from "../apiClient"; // ✅ yahan se backend se baat

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const { setUser } = useContext(AuthContext); // global auth state
  const navigate = useNavigate();

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/login", formData);

      setMessage(res.data.message);
      console.log("User:", res.data.user);

      // update global auth state
      setUser(res.data.user);

      // optional localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // redirect after login
      navigate("/");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <div className="login-main">
        <div className="login-left">
          <img
            src="https://plus.unsplash.com/premium_photo-1705563088263-24d812a8a96f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="img"
          />
        </div>
        <div className="login-right">
          <div className="login-right-container">
            <div className="login-logo">
              <img src={sun} alt="logo" />
            </div>
            <div className="login-center">
              <h2>Welcome back!</h2>
              <p>Please enter your details</p>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <div className="pass-input-div">
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="login-center-buttons">
                  <button className="btn" type="submit">
                    Log In
                  </button>
                  {message && <p>{message}</p>}
                </div>
              </form>
            </div>

            <p className="login-bottom-p">
              Don't have an account? <a href="/signup">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
