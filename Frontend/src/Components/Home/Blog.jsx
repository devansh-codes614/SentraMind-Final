import React from 'react'
import "./Blog.css"
import {Link} from "react-router-dom"


const Blog = () => {
  return (
    <div className="cta section__margin">
    <div className="cta-content">
      {/* <p>Request Early Access to Get Started</p> */}
      <h1>Let’s make mental health support accessible to all</h1>
    </div>
    <button><Link to="/chatbot">Get Started</Link></button>
  </div>
  )
}

export default Blog