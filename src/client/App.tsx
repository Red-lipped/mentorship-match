import React, { useState } from "react";
import SignupLoginPage from "../component/SignupLogin";
import Footer from "../component/Footer";
import LandingPage from "../component/LandingPage";
import NavBar from "../component/NavBar";
import Forum from "../component/ProfileDashboard";
import UsersPage from "../component/UsersPage"; 

const App = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForum, setShowForum] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleShowForum = () => {
    setShowForum(true);
  };

  return (
    <div className="page-container">
      <NavBar />
      <div className="content">
        {isLoggedIn ? (
          showForum ? (
            <UsersPage />
          ) : (
            <>
              <Forum />
              <button onClick={handleShowForum}>Forum</button>
            </>
          )
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
