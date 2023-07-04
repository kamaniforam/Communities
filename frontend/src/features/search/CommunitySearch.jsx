import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import SearchBar from "../../components/common/SearchBar";
import CommunityCard from "../../components/community/CommunityCard";

import { searchCommunities } from "./searchSlice";
import Loading from "../../components/common/Loading";

const CommunitySearch = (props) => {
  const dispatch = useDispatch();
  const { communities, isLoading, error } = useSelector((state) => state.search);
  const [searchText, setSearchText] = useState("");

  let { community } = useParams();

  useEffect(() => {
    if (community) {
      setTimeout(() => {
        setSearchText(community);
      }, 500);
    }
  }, [community]);

  useEffect(() => {
    dispatch(searchCommunities(searchText));
  }, [searchText]);

  return (
    <div>
      <SearchBar value={searchText} onChangeText={(text) => setSearchText(text)} />
      {isLoading && <Loading size={20} />}
      {error && <div>{error}</div>}
      {communities.map((community) => (
        <CommunityCard
          key={community.id}
          community={community}
          onClick={() => props.setSelectedCommunity(community)}
        />
      ))}
    </div>
  );
};

export default CommunitySearch;
