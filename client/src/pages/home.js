import React from "react";
import { useSelector } from "react-redux";
import Status from "../components/home/Status";
import Posts from "../components/home/Posts";
import loadingImg from "../images/loading.gif";

function Home(props) {
  const { homePosts } = useSelector((state) => state);

  return (
    <div className="home row mx-0">
      <div className="col-md-8">
        <Status />
        {homePosts.loading ? (
          <img
            src={loadingImg}
            alt="loading"
            className="loading-page mx-auto d-block"
          />
        ) : homePosts.result === 0 ? (
          "No posts."
        ) : (
          <Posts homePosts={homePosts} />
        )}
      </div>
      <div className="col-md-4"></div>
    </div>
  );
}

export default Home;
