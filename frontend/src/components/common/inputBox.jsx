import React from "react";
import "./inputBox.scss";

const Btn = ({ placeholder, type, onChange, value }) => {
  return (
    <div>
      <input
        className="commonBtn"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Btn;
