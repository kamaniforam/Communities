import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CreatePage from "./pages/CreatePage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SearchPage from "./pages/SearchPage";
import SettingsPage from "./pages/Settings";
import Signup from "./pages/Signup";
import PrivateRoutes from "./utils/PrivateRoutes";
import HomePage from "./pages/Home";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./pages/Profile";

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Initialize theme from local storage
    // This is done to prevent the theme from flickering on page re/loads
    const theme = localStorage.getItem("theme");
    if (theme && theme === "dark") {
      document.querySelector("body").setAttribute("data-theme", "dark");
    }
    setTheme(theme);
    setLoading(false);
  }, []);

  return (
    <div className="App">
      {!loading && (
        <>
          <Router>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/search/" element={<SearchPage />} />
                <Route path="/search/:community" element={<SearchPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/profile" element={<Profile />} />
                {/* <Route path="/onboard" element={<Onboard />} /> */}
              </Route>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Router>
          <ToastContainer position="top-right" theme={theme} />
        </>
      )}
    </div>
  );
}

export default App;
