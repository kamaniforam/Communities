import { FiSearch } from "react-icons/fi";
import "./input.scss";

const Input = (props) => {
  return (
    <div className="input-container">
      {props.isSearchBar && <FiSearch className="input-icon" />}
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        className="custom-input"
      />
    </div>
  );
};

export default Input;
