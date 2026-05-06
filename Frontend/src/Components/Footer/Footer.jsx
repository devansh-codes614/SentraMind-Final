import React from "react";
import "./footer.css";
import logo from "../../assets/sun.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer section__padding">
      <div className="footer-heading">
        <h1 className="gradient__text">
          Your thoughts deserve a safe space — let AI be your mindful companion.
        </h1>
      </div>

      <div className="footer-button">
        <Link to="/chatbot">Mental Health Chat Bot</Link>
      </div>

      <div className="footer-links">
        <div className="footer-links_logo green-filter">
          <img src={logo} alt="SentraMind Logo" />
          <p>Indore, All Rights Reserved</p>
        </div>

        <div className="footer-links_div">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/news">News</Link>
        </div>

        <div className="footer-links_div">
          <h4>Company</h4>
          <a href="#">About Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>

        <div className="footer-links_div">
          <h4>Get in touch</h4>
          <p>Indore, India</p>
          <a href="tel:+919111111111">+91 9111111111</a>
          <a href="mailto:support@sentramind.org">support@sentramind.org</a>
        </div>
      </div>

      <div className="footer-copyrights">
        ©2025 SentraMind. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;