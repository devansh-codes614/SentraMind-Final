import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Sentiment.css";
import { AuthContext } from "../../Authentication/AuthProvider";
import Article from "./Article";
import NewSentiment from "./NewSentiment";
import Details from "./Details";
import api from "../../apiClient"; // ✅ SAME client (baseURL: http://localhost:5000, withCredentials: true)

const Sentiment = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [allData, setAllData] = useState([]);
  const { user } = useContext(AuthContext);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await api.get("/sentra"); // GET http://localhost:5000/sentra
      setAllData(res.data);
    } catch (err) {
      console.error("Fetch sentiments error:", err);
      alert("Failed to load sentiments");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h2 className="text-center gradient__text">
        A Safe Space for Your Thoughts
      </h2>

      <div className={`split-layout ${selectedArticle ? "with-details" : ""}`}>
        {/* LEFT → all posts */}
        <div
          className={`articles-grid ${
            selectedArticle ? "half-width" : "full-width"
          }`}
        >
          {Array.isArray(allData) &&
            allData.map((item) => (
              <Article
  key={item._id}
  _id={item._id}
  user={item.user}
  date={item.date}
  title={item.text}
  owner={item.owner}
  currentUser={currentUser}
  onReadMore={() => setSelectedArticle(item._id)}
  onDeleted={fetchData}
/>
            ))}
        </div>

        {/* RIGHT → Selected article details */}
        {selectedArticle && (
          <div className="article-detail">
            <Details
              id={selectedArticle}
              onClose={() => setSelectedArticle(null)}
              onDeleted={fetchData}
            />
          </div>
        )}
      </div>

      {user && (
        <div className="btn">
          <button
            type="button"
            className="btn btn-success btn-lg"
            onClick={() => setShowPopup(true)}
          >
            New Sentiment
          </button>
        </div>
      )}

      {showPopup && (
        <NewSentiment onClose={() => setShowPopup(false)} onSaved={fetchData} />
      )}
    </>
  );
};

export default Sentiment;
