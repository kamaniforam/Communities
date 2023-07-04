import { useEffect, useState } from "react";
import CommunitySearch from "../features/search/CommunitySearch";
import Layout from "../layouts/Layout";
import CommunityHeader from "../components/community/CommunityHeader";
import { useSelector } from "react-redux";
import DisplayPost from "../components/posts/post components/DisplayPost";
import { toast } from "react-toastify";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import Loading from "../components/common/Loading";

const SearchPage = () => {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [selectedTab, setSelectedTab] = useState("posts");
  const [community, setCommunity] = useState(null);
  const { token } = useSelector((state) => state.auth);

  const getCommunityPosts = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/community/${selectedCommunity._id}`, {
        headers: { Authorization: `Basic ${token}` },
      })
      .then((res) => {
        setCommunity(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching community data");
      });
  };

  useEffect(() => {
    if (selectedCommunity) getCommunityPosts();
  }, [selectedCommunity]);

  return (
    <div className="page">
      <Layout pageName="Search">
        <div>
          <CommunitySearch setSelectedCommunity={setSelectedCommunity} />
        </div>
        {selectedCommunity && (
          <div className="page-center">
            <CommunityHeader
              community={selectedCommunity}
              setSelectedTab={setSelectedTab}
            />
            {!!community ? (
              <>
                {selectedTab === "posts" &&
                  community.posts
                    .reverse()
                    .map((post) => (
                      <DisplayPost
                        key={post._id}
                        post={post}
                        postDeleteCallback={getCommunityPosts}
                      />
                    ))}

                {selectedTab === "members" &&
                  community.members.map((member, index) => (
                    <div key={index} className="card user-card">
                      <CgProfile size={50} color="#2787f5" />
                      <span>{member.name}</span>
                    </div>
                  ))}

                {selectedTab === "moderators" &&
                  community.moderators.map((moderator, index) => (
                    <div key={index} className="card user-card">
                      <CgProfile size={50} color="#2787f5" />
                      <span>{moderator.name}</span>
                    </div>
                  ))}
              </>
            ) : (
              <Loading size={40} />
            )}
          </div>
        )}
      </Layout>
    </div>
  );
};

export default SearchPage;
