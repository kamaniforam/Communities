import React, { useEffect, useState } from "react";
import "../styles/NewPost.scss";
import OpenFormBtn from "./OpenFormBtn";
import FormStructure from "./FormStructure";
import {
  EVENT,
  MARKETPLACE,
  POLL,
  REGULAR,
} from "../../../constants/postTypes.ts";

const NewPost = () => {
  const [formData, setFormData] = useState({});
  const [displayForm, setDisplayForm] = useState(false);

  const handlePostBtnClick = (postType) => {
    setFormData({ FormType: postType });
    setDisplayForm(true);
  };

  return (
    <>
      <div className="new-post">
        <div className="new-post-body">
          <img className="avatar" src="/user-profile-icon.png" alt="" />
          <div
            className="placeholder"
            onClick={() => handlePostBtnClick(REGULAR)}
          >
            What's on your mind...?
          </div>
        </div>
        <hr className="line" />
        <div className="button-section">
          <OpenFormBtn
            text={EVENT}
            handleOnClick={() => handlePostBtnClick(EVENT)}
          />
          <OpenFormBtn
            text={MARKETPLACE}
            handleOnClick={() => handlePostBtnClick(MARKETPLACE)}
          />
          <OpenFormBtn
            text={POLL}
            handleOnClick={() => handlePostBtnClick(POLL)}
          />
        </div>
      </div>
      {displayForm && (
        <FormStructure
          {...formData}
          handleOnClose={() => setDisplayForm(false)}
        />
      )}
    </>
  );
};

export default NewPost;
