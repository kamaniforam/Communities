import React from "react";
import { useSelector } from "react-redux";
import CommunityCard from "../../components/community/CommunityCard";

const UserCommunities = () => {
  const { communities } = useSelector((state) => state.feed);
  return (
    <div>
      {communities.map((community) => (
        <CommunityCard key={community.id} community={community} />
      ))}
    </div>
  );
};

export default UserCommunities;
