import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./authSlice";
import "./loginForm.scss";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, message } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    error: "",
  });

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  useEffect(() => {
    if (message) setFormData((prevState) => ({ ...prevState, error: message }));
  }, [message, setFormData]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      error: "",
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email)
      setFormData((prevState) => ({
        ...prevState,
        error: "Email is required",
      }));
    else if (!password)
      setFormData((prevState) => ({
        ...prevState,
        error: "Password is required",
      }));
    else dispatch(login({ email, password }));
  };

  const { email, password, error } = formData;

  return (
    <div className="login-container">
      <div className="first-container">
        <div className="loginDetails">
          <form className="login-form" onSubmit={onSubmit}>
            <div className="title">
              <h1>Community</h1>
            </div>
            <div className="username">
              <input
                className="details"
                type="email"
                name="email"
                placeholder="Email"
                onChange={onChange}
                value={email}
              />
            </div>
            <div className="password">
              <input
                className="details"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={onChange}
              />
            </div>

            {error && <p>{error}</p>}

            <div className="login">
              <button type="submit" className="btn btn-primary loginbutton">
                Log in
              </button>
            </div>

            {/* <div className="separator">
              <span>OR</span>
            </div>

            <div className="google">
              <button type="button" className="btn btn-primary googlebutton">
                <img
                  className="google-logo"
                  src="/logo1.png"
                  alt={"Google Logo"}
                />
                Log in with Google
              </button>
            </div> */}
          </form>
        </div>
        <div className="second-container">
          <span className="signup">
            <p className="signupText">
              Don't have an account?
              <Link to="/signup"> Signup</Link>
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
