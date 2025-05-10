import React from "react";
import "./NotFoundPage.scss";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1>404 Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="back-home-button">Back to Home</Link>
    </div>
  );
};

export default NotFoundPage;
