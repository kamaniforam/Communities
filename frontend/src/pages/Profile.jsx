import UpdateProfile from "../features/profile/UpdateProfile";
import Layout from "../layouts/Layout";

const Profile = () => {
  return (
    <div className="page">
      <Layout pageName="Profile" leftWeight={0}>
        <div></div>
        <div className="">
          <UpdateProfile />
        </div>
      </Layout>
    </div>
  );
};

export default Profile;
