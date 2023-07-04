import Feed from "../features/feed/Feed";
import UserCommunities from "../features/feed/UserCommunities";
import Layout from "../layouts/Layout";

const Dashboard = () => {
  return (
    <div className="page">
      <Layout pageName="Feed">
        <div>
          <UserCommunities />
        </div>
        <Feed />
      </Layout>
    </div>
  );
};

export default Dashboard;
