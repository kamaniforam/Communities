import { useEffect, useState } from "react";
import SideNav from "./SideNav";

const Layout = ({ children, leftWeight = 1, rightWeight = 3, pageName }) => {
  const [currentTheme, setCurrentTheme] = useState("");

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setCurrentTheme(theme);
  }, []);

  const setTheme = (theme) => {
    document.querySelector("body").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setCurrentTheme(theme);
  };

  const toggleTheme = () => {
    const theme = document.querySelector("body").getAttribute("data-theme");
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const [left, right] = children;

  return (
    <div className="layout-container">
      <SideNav toggleTheme={toggleTheme} currentTheme={currentTheme} />
      <div className="left-pane" style={{ flex: leftWeight }}>
        {pageName && (
          <div className="layout-menu-header">
            <p>{pageName}</p>
          </div>
        )}
        {left}
      </div>
      <div className="right-pane" style={{ flex: rightWeight }}>
        {right}
      </div>
    </div>
  );
};

export default Layout;
