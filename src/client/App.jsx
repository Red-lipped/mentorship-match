import React, { useState } from 'react';
import SignupLoginPage from "../component/SignupLogin";
import { Footer } from '../component/Footer';
import LandingPage from "../component/LandingPage";
import Logo from "../../public/assets/Logo.png"

const App = () => {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="page-container">
      <img
        src= {Logo}
        alt= "logo"
        />
      <div className="content">
        {showSignup ? (
          <SignupLoginPage />
        ) : (
          <LandingPage onSignupClick={() => setShowSignup(true)} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;