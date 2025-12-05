import React from 'react'
import "./header.css"
import {Link} from "react-router"
import people from "../../assets/people.png"

const header = () => {
  return (
    <>
    <div className="slanted-section header section_padding" id='home'>
      <div className="header-content">
        <h1 className="gradient__text">Prioritize Your <br />Mental Health</h1>
        <p>Get mental health support today. <br /> Find the solution which is right for you.</p>

        <div className="header-content__input">
          <Link  to="/chatbot"><button type="button">Talk to Our Mental Health Assistant</button></Link>
          {/* <button onClick="/chatbot" type="button">Talk to Our Mental Health Assistant</button> */}
          
        </div>

        <div className="header-content__people">
          <img src={people} alt="people" />
          <p>Hundreds of minds found a safe space with us in the past day alone."</p>
        </div>

      </div>
      <div className="header-image">
        <img src={"https://t3.ftcdn.net/jpg/04/84/87/34/360_F_484873483_hg1ofIdXbMha5lKEDG3hJBrwKh1oikTq.jpg"} alt="img" />
      </div>
      
    </div>
    </>
    
  )
}

export default header