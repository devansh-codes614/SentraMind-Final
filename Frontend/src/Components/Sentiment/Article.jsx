import React from "react";
import "./Article.css";
import api from "../../apiClient";

const Article = ({
  _id,
  user,
  date,
  title,
  owner,
  currentUser,
  onReadMore,
  onDeleted,
}) => {

  // =========================
  // CHECK OWNER
  // =========================
  const canDelete =
    currentUser &&
    (currentUser._id === owner ||
      currentUser.role === "admin");

  // =========================
  // DELETE POST
  // =========================
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/sentra/${_id}`);

      alert("Post deleted successfully");

      if (onDeleted) {
        onDeleted();
      }
    } catch (err) {
      console.error("Delete error:", err);

      alert(
        err.response?.data?.error ||
          "Failed to delete post"
      );
    }
  };

  return (
    <div className="blog-container_article">

      <div className="blog-container_article-content">

        {/* TOP */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h4 className="username">
            <i className="fa-solid fa-user"></i> {user}
          </h4>

          <p className="text-muted">{date}</p>
        </div>

        {/* TITLE */}
        <h3>{title}</h3>

        {/* ACTION BUTTONS */}
        <div
          className="article-actions"
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "15px",
            flexWrap: "wrap",
          }}
        >

          {/* READ BUTTON */}
          <button
            className="btn-read read-link"
            onClick={() => onReadMore(_id)}
          >
            Read Full Post{" "}
            <i className="fa-solid fa-caret-right"></i>
          </button>

          {/* DELETE BUTTON */}
          {canDelete && (
            <button
              className="btn-delete"
              onClick={handleDelete}
              style={{
                background: "#ff4d4f",
                color: "white",
                border: "none",
                padding: "10px 14px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              <i className="fa-solid fa-trash"></i> Delete
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default Article;