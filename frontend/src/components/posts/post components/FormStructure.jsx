import React from "react";
import { FiX, FiUpload } from "react-icons/fi";
import "../styles/FormStructure.scss";
import { EVENT, MARKETPLACE, POLL } from "../../../constants/postTypes.ts";

const FormStructure = ({
  ProfileImage,
  UserName,
  FormType,
  handleOnClose,
  ...props
}) => {
  console.log(FormType);
  return (
    <div className="form-background">
      <div className="FormPost">
        {/* post header */}

        <div className="form-header">
          <p>Create Post</p>

          <button
            onClick={() => {
              if (handleOnClose) {
                handleOnClose();
              }
            }}
            className="form-close"
          >
            <FiX />
          </button>
        </div>
        <hr className="line" />
        {/* user info */}
        <div className="form-header-info">
          <img src={ProfileImage} alt="Profile" />
          <h4>{UserName}Christ Rodrigues</h4>
        </div>

        {/* form body content */}
        <div className="form-body">
          {/* if form is of event type */}
          {FormType === EVENT && (
            <>
              <div className="Address-field">
                <p>Address: </p>
                <input
                  type="text"
                  className="address"
                  placeholder="Enter the Location"
                  required
                />
              </div>
            </>
          )}

          {/* if the form is of type marketplace */}
          {FormType === MARKETPLACE && (
            <>
              <div className="price-field">
                <p>Enter the Product Price: </p>
                <input type="text" placeholder="$0" required />
              </div>
            </>
          )}

          <textarea
            className="textarea"
            name="text"
            cols="68"
            rows="auto"
            placeholder="What's on your mind...?"
          ></textarea>
          <br />

          {/* if the post is of poll type */}
          {FormType === POLL && (
            <>
              <div className="poll-options">
                <p>Enter your options below</p>
                <input type="text" placeholder="Enter Option 1" required />
                <input type="text" placeholder="Enter Option 2" required />
                <input type="text" placeholder="Enter Option 3" />
                <input type="text" placeholder="Enter Option 4" />
              </div>
            </>
          )}

          {/* if the post has an image */}
          {/* {image && <></>} */}
          <div className="upload-Img">
            <p>Upload the Image</p>
            <button>
              <FiUpload />
              <span> Choose Image</span>
            </button>
          </div>
        </div>

        {/* footer section */}
        <div className="form-footer">
          <button className="postBtn">Post</button>
        </div>
      </div>
    </div>
  );
};

export default FormStructure;
