import React from 'react'
import "./Article.css"
import { Link } from "react-router-dom";

const Article = ({ _id, user, date, title, owner, currentUser, onReadMore }) => {
  const canEdit = currentUser && (currentUser._id === owner || currentUser.role === "admin");
  return (

    <div className="blog-container_article">

      <div className="blog-container_article-content">

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h4 className='username'><i className="fa-solid fa-user"></i> {user}</h4>
          <p className="text-muted">{date}</p>
        </div>

        <h3>{title}</h3>


        {/* <Link to={`/details/${_id}`} className="read-link">
          Read Full Article
          </Link> */}
        <button className="btn-read read-link " onClick={() => onReadMore(_id)}>
          Read Full Post <i className="fa-solid fa-caret-right"></i>
        </button>


      </div>
    </div>
  )
}

export default Article