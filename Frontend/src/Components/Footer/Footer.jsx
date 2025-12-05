import React from 'react'
import "./footer.css"
import logo from "../../assets/sun.png"
import { Link } from "react-router-dom"


const footer = () => {
  return (
    <>
      <div className="footer section__padding">
      <div className="footer-heading">
        <h1 className="gradient__text">
        Your thoughts deserve a safe space — let AI be your mindful companion.
        </h1>
      </div>
      <div className="footer-button">
        <Link to="/chatbot"><p>Mental Health Chat Bot</p></Link>
      </div>
      <br />
      <div className="footer-links">
        <div className="footer-links_logo green-filter">
          <img src={logo} alt="gpt3 logo" />
          <p>Indore , All Rights Reserved</p>
        </div>
        <div className="footer-links_div">
          <h4>Links</h4>
          <p>Overons</p>
          <p>Social Media</p>
          <p>Contact</p>
        </div>
        <div className="footer-links_div">
          <h4>Company</h4>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
          <p>Contact</p>
        </div>
        <div className="footer-links_div">
          <h4>Get in touch</h4>
          <p>Indore </p>
          <p>+91 9111111111</p>
          <p>support@sentramind.org</p>
        </div>
      </div>
      <br /><br />
      <div className="footer-copyrights">
        ©2025 SentraMind. All rights reserved.
      </div>
    </div>
    </>
  )
}

export default footer