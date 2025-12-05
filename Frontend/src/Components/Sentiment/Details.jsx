import React, { useEffect, useState } from "react";
import "./Details.css";
import EditSentiment from "./EditSentiment";
import api from "../../apiClient";

const Details = ({ id, onClose, onDeleted }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [article, setArticle] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/sentra/${id}`);
        setArticle(res.data);
      } catch (err) {
        console.error("Fetch sentiment details error:", err);
      }
    })();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this sentiment?"))
      return;

    try {
      const res = await api.delete(`/sentra/${id}`);

      alert("Deleted successfully!");
      if (onDeleted) onDeleted();
      onClose();
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.error || "Something went wrong while deleting."
      );
    }
  };

  if (!article) return <p>Loading...</p>;

  const canEdit =
    currentUser &&
    (currentUser._id === article.owner || currentUser.role === "admin");

  return (
    <div className="div">
      <p className="text-muted">{article.date}</p>
      <button
        type="button"
        style={{ position: "relative", bottom: "30px" }}
        className="close"
        onClick={onClose}
      >
        <i className="fa-solid fa-xmark fa-lg"></i>
      </button>
      <br />

      <h3>
        <i className="fa-solid fa-user"></i> {article.user}
      </h3>

      <div className="box">
        <h2>{article.text}</h2>
        <p>
          <strong>You are feeling : </strong>&nbsp;
          {article.sentiment || "Not analyzed"}
        </p>
      </div>

      {canEdit && (
        <>
          <button
            className="editbtn close"
            onClick={() => setShowPopup(true)}
          >
            <i className="fa-solid fa-pen-to-square fa-lg"></i>
          </button>

          {showPopup && (
            <EditSentiment
              id={article._id}
              onClose={() => setShowPopup(false)}
              onSaved={(updatedArticle) => {
                setArticle(updatedArticle);
                setShowPopup(false);
              }}
            />
          )}

          <button className="close dltBtn" onClick={handleDelete}>
            <i className="fa-solid fa-trash-can fa-lg"></i>
          </button>
        </>
      )}
    </div>
  );
};

export default Details;
