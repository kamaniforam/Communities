import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "./authSlice";
import { Link } from "react-router-dom";
import "./signupForm.scss";

const emailRegex = /\S+@\S+\.\S+/;

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    school: "",
    company: "",
    password: "",
    password2: "",
    error: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, message, isLoading } = useSelector((state) => state.auth);

  const { name, email, phone, school, company, password, password2, error } = formData;

  useEffect(() => {
    if (message) setFormData((prevState) => ({ ...prevState, error: message }));
  }, [message, setFormData]);

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      error: "",
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name) setFormData((prevState) => ({ ...prevState, error: "Name is required" }));
    else if (!email)
      setFormData((prevState) => ({
        ...prevState,
        error: "Email is required",
      }));
    else if (!phone)
      setFormData((prevState) => ({
        ...prevState,
        error: "Phone is required",
      }));
    else if (!password)
      setFormData((prevState) => ({
        ...prevState,
        error: "Password is required",
      }));
    else if (!emailRegex.test(email))
      setFormData((prevState) => ({ ...prevState, error: "Email is invalid" }));
    else if (!phone.match(/^\d{10}$/))
      setFormData((prevState) => ({
        ...prevState,
        error: "Enter a 10 digit phone number without spaces or special characters",
      }));
    else if (password.length < 6)
      setFormData((prevState) => ({
        ...prevState,
        error: "Password must be at least 6 characters",
      }));
    else if (password !== password2)
      setFormData((prevState) => ({
        ...prevState,
        error: "Passwords do not match",
      }));
    else {
      dispatch(signup({ name, email, phone, school, company, password }));
    }
  };

  return (
    <div className="contain auth-form">
      <div className="first-container">
        <div className="form-wrapper">
          <div className="title">
            <h1>Community</h1>
          </div>
          <form onSubmit={onSubmit}>
            <div className="signup-form form-group">
              <input
                type="text"
                placeholder=" Name"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>
            <div className="signup-form form-group">
              <input
                type="email"
                name="email"
                placeholder=" Email"
                onChange={onChange}
                value={email}
              />
            </div>
            <div className="signup-form form-group">
              <input
                type="text"
                placeholder=" Phone"
                name="phone"
                value={phone}
                onChange={onChange}
              />
            </div>
            {/* <div className="signup-form form-group">
              <input
                type="text"
                placeholder=" Location"
                name="location"
                value={loc}
                onChange={onChange}
              />
            </div> */}
            <div className="signup-form form-group">
              <input
                type="text"
                placeholder=" School"
                name="school"
                value={school}
                onChange={onChange}
              />
            </div>
            <div className="signup-form form-group">
              <input
                type="text"
                placeholder=" Company"
                name="company"
                value={company}
                onChange={onChange}
              />
            </div>
            <div className="signup-form form-group">
              <input
                type="password"
                name="password"
                placeholder=" Password"
                value={password}
                onChange={onChange}
              />
            </div>
            <div className="signup-form form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={onChange}
              />
            </div>
            {error && <span style={{ color: "red" }}>{error}</span>}
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              <div className="signup-form form-group">
                <button type="submit" className="btn btn-primary signupBtn">
                  Sign up
                </button>
              </div>
            )}
          </form>
        </div>
        <div className="second-container">
          <span className="signup">
            <p className="account">
              Already have an account ? <Link to="/login">Login</Link>
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
