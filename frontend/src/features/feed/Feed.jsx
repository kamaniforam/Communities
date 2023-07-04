import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeed } from "./feedSlice";
import DisplayPost from "../../components/posts/post components/DisplayPost";
import Loading from "../../components/common/Loading";

const Feed = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, error } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch(getFeed());
  }, []);

  return (
    <div
      className="flex-center"
      style={{ justifyContent: isLoading ? "center" : "start" }}
    >
      {isLoading && <Loading />}
      {error && <div>{error}</div>}
      {!isLoading &&
        posts.map((post) => (
          <DisplayPost
            key={post._id}
            post={post}
            postDeleteCallback={() => dispatch(getFeed())}
          />
        ))}
    </div>
  );
};

export default Feed;
