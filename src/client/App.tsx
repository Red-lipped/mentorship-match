import React, { useState } from "react";
import SignupLoginPage from "../component/SignupLogin";
import  Footer  from "../component/Footer";
import LandingPage from "../component/LandingPage";
import  NavBar  from "../component/NavBar";

const App = () => {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="page-container">
      <NavBar />

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
};

export default App;
