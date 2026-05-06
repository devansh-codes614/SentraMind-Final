import React, { useEffect, useState } from "react";
import "./News.css";

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/news")
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);
        setArticles(data);
      })
      .catch((err) => {
        console.log("News fetch error:", err);
      });
  }, []);

  return (
    <div className="news-page">
      <h1 className="news-heading">Mental Health News</h1>

      <div className="news-grid">
        {articles.map((article, index) => (
          <div className="news-card" key={index}>
            <img
              src={
                article.urlToImage ||
                "https://via.placeholder.com/400x220?text=No+Image"
              }
              alt={article.title}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x220?text=No+Image";
              }}
            />

            <div className="news-content">
              <p>{new Date(article.publishedAt).toDateString()}</p>
              <h2>{article.title}</h2>

              <a href={article.url} target="_blank" rel="noreferrer">
                Read Full Article
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;