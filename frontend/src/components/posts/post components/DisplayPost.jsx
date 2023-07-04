import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiMapPin, FiVolume2, FiTrash2 } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify";

import { speechHandler } from "../../../utils/TextToSpeech";

import "../styles/DisplayPost.scss";
import axios from "axios";

const DisplayPost = ({ post: propPost, postDeleteCallback }) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [post, setPost] = useState(propPost);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (post.type === "poll") {
      for (let i = 0; i < post.options.length; i++) {
        if (post.options[i].votes.includes(user.id)) {
          setHasVoted(true);
          break;
        }
      }
    }
  }, [post.type]);

  const votePost = (option) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/post/${post._id}/vote`,
        { option },
        { headers: { Authorization: `Basic ${token}` } }
      )
      .then((res) => {
        console.log(res, hasVoted);
        setPost(res.data);
        setHasVoted(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Your vote could not be saved");
      });
  };

  const deletePost = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/post/${post._id}`, {
        headers: { Authorization: `Basic ${token}` },
      })
      .then((res) => {
        toast.success("Post deleted successfully");
        postDeleteCallback();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error deleting post");
      });
  };

  return (
    <div className="DisplayPost">
      {/* post header */}
      <div className="post-header">
        <CgProfile size={50} color="#2787f5" />
        <div className="post-header-info">
          <h4>
            {post.author?.name}
            {post.community.name && (
              <>
                ,{" "}
                <Link to={`/search/${post.community.name}`} className="post-link">
                  {post.community?.name}
                </Link>
              </>
            )}
          </h4>
          {post.location && (
            <a
              href={`https://maps.google.com?q=${post.location}`}
              target="_blank"
              className="location"
            >
              <FiMapPin />
              {post.location}
            </a>
          )}
          <p>{moment(post.createdAt).format("ll LT")}</p>
        </div>
        {/* location if post is of event type */}
      </div>

      {/* post body content */}
      <div className="post-content">
        {/* if the post is of type marketplace */}

        {/* {postType === "marketplace" && <></>} */}
        {post.title && <h4>{post.price}</h4>}
        {post.price && <h4>Price: {post.price}</h4>}
        <p>{post.text}</p>
        {/* if the post has an image */}

        {post.images?.length > 0 && (
          <div className="post-img">
            <img src={post.images[0]} alt="preview" />
          </div>
        )}

        {/* if the post is of poll type */}
        {post.type === "poll" && (
          <>
            <div className="poll-options">
              {post.options.map((option, index) => (
                <div
                  key={index}
                  className="poll-option"
                  onClick={() => votePost(option.value)}
                >
                  <span>{option.value}</span>
                  <span>{option.votes.length} votes</span>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="post-buttons">
          <FiVolume2
            size={20}
            className="post-button"
            onClick={() => {
              speechHandler(post.text);
            }}
          />
          {user.id === post.author.id && (
            <FiTrash2 size={18} className="post-button" onClick={deletePost} />
          )}
        </div>
      </div>
      {/* post footer */}
      {/* <div className="post-footer">
        <div className="likes-count">
          <p>
            <FiThumbsUp /> 123{likes}
          </p>
        </div>
        <hr className="line" />
        <div className="post-footer-buttons">
          <button>
            <FiThumbsUp /> Like
          </button>
          <button>
            <FiMessageSquare /> Comment
          </button>
          <button>
            <FiShare2 /> Share
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default DisplayPost;
