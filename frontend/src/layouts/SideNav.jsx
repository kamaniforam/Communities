import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

import "./layouts.scss";
import {
  FiSearch,
  FiEdit3,
  FiSettings,
  FiMoon,
  FiSun,
  FiLogOut,
  FiLayers,
} from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { HiUserGroup } from "react-icons/hi";

const SideNav = ({ toggleTheme, currentTheme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="sidenav">
      <Link to="/dashboard">
        <HiUserGroup size={50} className="logo" />
      </Link>
      <ul style={styles.ul}>
        <li className="icons feed">
          <Link to="/dashboard">
            <FiLayers
              title="Feed"
              size={26}
              className={`sidebar-icon ${
                pathname.includes("/dashboard") ? "active" : ""
              }`}
            />
          </Link>
        </li>
        <li className="icons">
          <Link to="/search">
            <FiSearch
              title="Search"
              size={26}
              className={`sidebar-icon ${pathname.includes("/search") ? "active" : ""}`}
            />
          </Link>
        </li>
        <li className="icons">
          <Link to="/create">
            <FiEdit3
              title="Create Post"
              size={26}
              className={`sidebar-icon ${pathname.includes("/create") ? "active" : ""}`}
            />
          </Link>
        </li>

        <li className="icons">
          <Link to="/profile">
            <CgProfile title="User Profile" size={32} className="sidebar-icon" />
          </Link>
        </li>
        {/* <li className="icons">
          <Link to="/settings">
            <FiSettings
              title="Settings"
              size={26}
              className={`sidebar-icon ${
                pathname.includes("/settings") ? "active" : ""
              }`}
            />
          </Link>
        </li> */}
      </ul>
      <ul style={styles.ul}>
        <li className="icons">
          {currentTheme === "dark" ? (
            <FiMoon
              title="Light mode"
              size={26}
              className="sidebar-icon"
              onClick={toggleTheme}
            />
          ) : (
            <FiSun
              title="Dark mode"
              size={26}
              className="sidebar-icon"
              onClick={toggleTheme}
            />
          )}
        </li>

        {/* Logout button */}
        <li className="icons">
          <button
            className="unset-btn"
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
          >
            <FiLogOut title="Logout" size={26} className="sidebar-icon" color="red" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;

const styles = {
  ul: {
    listStyle: "none",
    padding: 0,
  },
};
