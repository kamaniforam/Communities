import React from "react";
import "../community/communityHeader.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CommunityHeader = ({ community, setSelectedTab }) => {
  const { token, user } = useSelector((state) => state.auth);
  const isMember = community.members.includes(user._id);

  const joinCommunity = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/community/${community._id}/join`, {
        headers: { Authorization: `Basic ${token}` },
      })
      .then((res) => {
        console.log(res);
        toast.success(`Welcome to ${community.name}`);
      });
  };

  return (
    <div className="card-center">
      <div className="card headcard">
        <div className="card-body cardbody ">
          <h5 className="card-title name"> {community.name}</h5>
          <p className="card-text desc">{community.description}</p>
        </div>
        <div className="join">
          <div className="schooltype">
            <span className="mutetxt1 badge badge-primary">{community.type}</span>
            <p className="card-text">
              <small className="text-muted mutetxt">
                {community.members.length} Members
              </small>
            </p>
          </div>
          {!isMember && (
            <div className="jc">
              <button className="btn btn-primary joincomm" onClick={joinCommunity}>
                Join Community
              </button>
            </div>
          )}
        </div>
        <div className="cardButtons">
          <div className="cardButton" onClick={() => setSelectedTab("posts")}>
            Posts
          </div>
          <div className="cardButton" onClick={() => setSelectedTab("members")}>
            Members
          </div>
          <div className="cardButton" onClick={() => setSelectedTab("moderators")}>
            Moderators
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;
