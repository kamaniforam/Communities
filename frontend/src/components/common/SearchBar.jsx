import React from "react";
import { FiSearch } from "react-icons/fi";
import "../common/SearchBar.scss";

const SearchBar = ({ value, onChangeText, placeholder = "Search" }) => {
  return (
    <div>
      <div className="searchBar">
        <div className="input-group-prepend ">
          <span className="input-group-text icon" id="inputGroup-sizing-sm">
            <FiSearch />
          </span>
        </div>
        <input
          className="searchInput"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChangeText(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
