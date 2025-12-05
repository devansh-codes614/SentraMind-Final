import React from 'react'
import "./possibility.css"
import group from "../../../assets/group.png"


const Possibility = () => {
  return (
    <div className="gpt3__possibility section__padding" id='possibility'>
        <div className="gpt3__possibility-image">
          <img src={group} alt="possibility" />
        </div>
        <div className="gpt3__possibility-container">
  <p><a href="/">Start Your Journey to a Healthier Mind</a></p>
  <h1>Explore, Reflect, and Grow with Your Personal AI Companion</h1>
  <p>Share your thoughts, track your emotions, and get gentle insights from our AI-powered journal. Your safe space for mental wellness, anytime, anywhere.</p>
</div>

    </div>
  )
}

export default Possibility