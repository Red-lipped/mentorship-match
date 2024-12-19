import React, { JSX } from "react";
import  NavBar from "./NavBar";
import Footer from "./Footer";
import UsersPage from "./UsersPage";


interface LandingPageProps {
  onSignupClick: () => void;
}

const LandingPage = ({ onSignupClick }: LandingPageProps): JSX.Element => {
  return (
    <div className="landing-page">
      {/* <NavBar /> */}
      <div className="landing-content">
        <h1>Welcome to Mentorship Match</h1>
        <p>Your journey to find the perfect mentor or mentee starts here.</p>
        <button onClick={onSignupClick}>Sign Up Now</button>
        <ul className="landing-links">
          <li>
            <h3>Join our mentee list</h3>
            <img
              src="public/assets/sigmund-unsplash.jpg"
              alt="Join our mentee list"
              className="link-img"
            />
          </li>
          <li>
            <h3>Check out our newest Mentors</h3>
            <img
              src="public/assets/sigmund-unsplash.jpg"
              alt="Check out our newest Mentors"
              className="link-img"
            />
          </li>
          <li>
            <h3>Hear success stories</h3>
            <img
              src="public/assets/sigmund-unsplash.jpg"
              alt="Hear success stories"
              className="link-img"
            />
          </li>
          <li>
            <h3>Watch growth and inspirational videos</h3>
            <img
              src="public/assets/sigmund-unsplash.jpg"
              alt="Watch growth and inspirational videos"
              className="link-img"
            />
          </li>
        </ul>
        <h1>Make your STEM connections today!</h1>
      </div>
      {/* <Footer/> */}
      <UsersPage />
    </div>
  );
};

export default LandingPage;
