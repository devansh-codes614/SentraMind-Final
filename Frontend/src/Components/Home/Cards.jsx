import React from 'react'
import  ArticleCards  from './ArticleCard'

import "./Cards.css"

const Blog = () => {
  return (
    <div className="gpt3__blog section__padding ">
      <div className="gpt3__blog-heading">
        <h1 className="gradient__text">
        A lot is on your mind, we’re here to listen.
        </h1>
      </div>
      <div className="gpt3__blog-container">
        <div className="gpt3__blog-container_groupA">
          <ArticleCards imgUrl="https://img.freepik.com/free-photo/successful-happy-business-team_53876-15205.jpg?semt=ais_hybrid&w=740&q=80" date="Jul 05,2022" title="Where technology meets mental wellness." />
        </div>
        <div className="gpt3__blog-container_groupB">
          <ArticleCards imgUrl="https://images.unsplash.com/photo-1504022462188-88f023db97bf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" date="Jul 05,2022" title="Where technology meets mental wellness." />
          <ArticleCards imgUrl="https://images.unsplash.com/photo-1504022462188-88f023db97bf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" date="Jul 05,2022" title="Where technology meets mental wellness." />
          <ArticleCards imgUrl="https://images.unsplash.com/photo-1504022462188-88f023db97bf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" date="Jul 05,2022" title="Where technology meets mental wellness." />
          <ArticleCards imgUrl="https://images.unsplash.com/photo-1504022462188-88f023db97bf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" date="Jul 05,2022" title="Where technology meets mental wellness." />
        </div>
      </div>
    </div>
  )
}

export default Blog
