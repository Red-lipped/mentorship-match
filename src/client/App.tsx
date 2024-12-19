import React, { useState } from "react";
import SignupLoginPage from "../component/SignupLogin";
import Footer from "../component/Footer";
import LandingPage from "../component/LandingPage";
import NavBar from "../component/NavBar";
import Forum from "../component/ProfileDashboard";

const App = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="page-container">
      <NavBar />
      <div className="content">
        {isLoggedIn ? (
          // If user is logged in, show profile dashboard
          <Forum />
        ) : showSignup ? (
          <SignupLoginPage onLoginSuccess={handleLoginSuccess} />
        ) : (
          <LandingPage onSignupClick={() => setShowSignup(true)} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;