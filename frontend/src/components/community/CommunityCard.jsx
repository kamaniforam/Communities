import React from "react";
import "./communityCard.scss";

const CommunityCard = ({ community, onClick }) => {
  return (
    <div className="community-card card" onClick={onClick}>
      <div className="mainCard">
        <div className="leftcard">
          <img className="profile" src="/comm.jpeg" alt="profile" />
        </div>
        <div className="rightcard">
          <div className="commheader">{community.name}</div>
          <p className="commtext">{community.description}</p>
        </div>
      </div>
      <div className="card-footer commfooter">
        <div className="f1">
          <span className=" mem">
            {community.members.length}{" "}
            {community.members.length > 1 ? "members" : "member"}
          </span>
        </div>
        <div className="f2">
          <p className="badge badge-primary cotitle">{community.type}</p>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
