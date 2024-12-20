import { JSX } from "react";
// We are able to import the stock static image and refer to it in the landing page
import Image from '../../public/assets/sigmund-unsplash.jpg';

// The interface is necessary in order to provide a type of the onSignupClick function
interface LandingPageProps {
  onSignupClick: () => void;
}

const LandingPage = ({ onSignupClick }: LandingPageProps): JSX.Element => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Welcome to Mentorship Match</h1>
        <p>Your journey to find the perfect mentor or mentee starts here.</p>
        <button onClick={onSignupClick}>Sign Up Now</button>
        <ul className="landing-links">
          <li>
            <h3>Join our mentee list</h3>
            <img
              src={Image}
              alt="Join our mentee list"
              className="link-img"
            />
          </li>
          <li>
            <h3>Check out our newest Mentors</h3>
            <img
              src={Image}
              alt="Check out our newest Mentors"
              className="link-img"
            />
          </li>
          <li>
            <h3>Hear success stories</h3>
            <img
              src={Image}
              alt="Hear success stories"
              className="link-img"
            />
          </li>
          <li>
            <h3>Watch growth and inspirational videos</h3>
            <img
              src={Image}
              alt="Watch growth and inspirational videos"
              className="link-img"
            />
          </li>
        </ul>
        <h1>Make your STEM connections today!</h1>
      </div>
    </div>
  );
};

export default LandingPage;