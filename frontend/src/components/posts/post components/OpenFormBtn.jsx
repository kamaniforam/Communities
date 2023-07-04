import React from "react";
import "../styles/OpenFormBtn.scss";

const OpenFormBtn = ({ text, handleOnClick, ...props }) => {
  // console.log("THis is text", text);
  return (
    <button className="open-form-btn" onClick={handleOnClick}>
      {text}
    </button>
  );
};

export default OpenFormBtn;
