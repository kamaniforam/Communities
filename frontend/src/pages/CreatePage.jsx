import { useState } from "react";
import CreateCommunity from "../features/create/CreateCommunity";
import CreateMenu from "../features/create/CreateMenu";
import CreatePost from "../features/create/CreatePost";
import Layout from "../layouts/Layout";

const CreatePage = () => {
  const [formType, setFormType] = useState(""); // 'community' or 'post'
  const [postType, setPostType] = useState("post");
  return (
    <div className="page">
      <Layout pageName="Create">
        <div>
          {/* <h1 className="createtag">Create</h1> */}
          <CreateMenu
            setFormType={setFormType}
            formType={formType}
            setPostType={setPostType}
            postType={postType}
          />
        </div>
        <div>
          {formType === "community" && <CreateCommunity />}
          {formType === "post" && !!postType && (
            <CreatePost postType={postType} />
          )}
        </div>
      </Layout>
    </div>
  );
};

export default CreatePage;
