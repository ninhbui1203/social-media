import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getPost } from "../../redux/actions/postAction";
import loadingImg from "../../images/loading.gif";
import PostCard from "../../components/PostCard";

function Post(props) {
  const { id } = useParams();
  const [post, setPost] = useState([]);

  const { auth, postDetail } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.token) {
      if (postDetail.every((item) => item._id !== id)) {
        dispatch(getPost(id, auth));
      }

      if (postDetail.length > 0) {
        const newPost = postDetail.filter((item) => item._id === id);
        setPost(newPost);
      }
    }
  }, [id, auth, postDetail, dispatch]);

  return (
    <div className="posts">
      {post.length === 0 && (
        <img
          src={loadingImg}
          className="loading d-block my-2 mx-auto"
          alt="Loading..."
        />
      )}

      {post.map((data) => (
        <PostCard key={data._id} post={data} />
      ))}
    </div>
  );
}

export default Post;
