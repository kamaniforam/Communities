import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./home.scss";
import { HiUserGroup } from "react-icons/hi";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <div className="onboarding-page">
        <nav className="navbar navbar-expand-lg sticky-top">
          <a className="navbar-brand" href="#home">
            <HiUserGroup size={40} />
          </a>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a href="#about">About</a>
              </li>
              <li className="nav-item">
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="d-flex mr-auto" id="navbarNav">
            {!!user ? (
              <Link to="/dashboard">Dashboard</Link>
            ) : (
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup">Signup</Link>
                </li>
              </ul>
            )}
          </div>
        </nav>

        <div className="onboarding">
          <div className="home-content" id="home">
            <div className="ad">
              <img src="/comm.jpeg" alt="community" height={570} />
            </div>
            <div className="left">
              <div className="left-text">
                <h1>Lets find your Community</h1>
                <h1> and Connect...</h1>
                <strong>
                  This platform connects people from different communties, neighbourhood,
                  and similar interests.
                </strong>
              </div>
            </div>
          </div>

          {/* ABOUT CONTENT */}
          <div className="about-content" id="about">
            <div className="card-deck homedeck">
              <div className=" homecard card">
                <img
                  className="card-img-top top"
                  src="/localevents.jpeg"
                  alt="Card cap"
                  width={350}
                />
                <div className="card-block">
                  <h4 className="card-title homeT">Local Events</h4>
                  <p className="card-text hometxt">
                    Know what events are happenging around you!!
                  </p>
                </div>
              </div>

              <div className="card homecard">
                <img
                  className="card-img-top top"
                  src="/events.jpeg"
                  alt="Card cap"
                  width={300}
                />
                <div className="card-block">
                  <h4 className="card-title homeT">Community Events</h4>
                  <p className="card-text hometxt">
                    A place where you can connect and chil!
                  </p>
                </div>
              </div>

              <div className="card homecard">
                <img
                  className="card-img-top top"
                  src="/volunteer.jpeg"
                  alt="Card cap"
                  width={300}
                />
                <div className="card-block">
                  <h4 className="card-title homeT">Volunteering Events</h4>
                  <p className="card-text hometxt">
                    Participate in the Volunteering events with your friends!
                  </p>
                </div>
              </div>

              <div className="card homecard">
                <img
                  className="card-img-top top"
                  src="/community.jpeg"
                  alt="Card cap"
                  width={300}
                />
                <div className="card-block">
                  <h4 className="card-title homeT">Volunteering Events</h4>
                  <p className="card-text hometxt">
                    Participate in the Volunteering events with your friends!
                  </p>
                </div>
              </div>

              <div className="card homecard">
                <img
                  className="card-img-top top"
                  src="/festivals.jpg"
                  alt="Card cap"
                  width={300}
                />
                <div className="card-block">
                  <h4 className="card-title homeT">Celebrate Festivals Together</h4>
                  <p className="card-text hometxt">
                    Don't miss out on amazing festival celebration events!
                  </p>
                </div>
              </div>

              <div className="card homecard">
                <img className="card-img-top" src="/flea.jpeg" alt="Card cap" />
                <div className="card-block">
                  <h4 className="card-title homeT">Flea Bazar</h4>
                  <p className="card-text hometxt">Explore amazing market places!</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-content" id="contact">
            <h2>Contact Us</h2>
            <p>Get in touch with us for any queries or feedback</p>
            <div className="container">
              <form>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <textarea placeholder="Message"></textarea>
                <button className="sendbtn" type="submit">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
