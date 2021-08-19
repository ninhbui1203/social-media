import React from "react";
import { Link } from "react-router-dom";

function CardFooter({ post }) {
  return (
    <div className="card_footer">
      <div className="card_icon_menu">
        <div>
          <i className="far fa-heart" />
          <Link to={`/post/${post._id}`}>
            <i className="far fa-comment" />
          </Link>
          <i className="fas fa-paper-plane" />
        </div>
        <i className="far fa-bookmark" />
      </div>

      <div className="d-flex justify-content-between px-4">
        <h6 style={{ padding: "0 10px" }}>{post.likes.length}</h6>
        <h6>{post.comments.length} comments</h6>
      </div>
    </div>
  );
}

export default CardFooter;
