// import React, { JSX, useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";


// const LandingPage = ():JSX.Element => {
//     const navigate = useNavigate();
//     const handleSignupRedirect = () => {
//         navigate("/SignupLogin"); // Update '/signup' with the correct path to your Signup page.
//       };
    
    
//     return (
//         <div className="landing-page">
//           <div className="landing-content">
//             <h1>Welcome to Mentorship Match</h1>
//             <p>Your journey to find the perfect mentor or mentee starts here.</p>
//             <button onClick={handleSignupRedirect}>Sign Up Now</button>
//           </div>
//         </div>
//       );
//     };


// export default LandingPage;


import React, { JSX } from "react";
import Logo from "../../public/assets/Logo.png"


interface LandingPageProps {
  onSignupClick: () => void;
}

const LandingPage = ({ onSignupClick }: LandingPageProps): JSX.Element => {
  return (
    <div className="landing-page">
      <img
        src= {Logo}
        alt= "logo"
        />
      <div className="landing-content">
        <h1>Welcome to Mentorship Match</h1>
        <p>Your journey to find the perfect mentor or mentee starts here.</p>
        <button onClick={onSignupClick}>Sign Up Now</button>
      </div>
    </div>
  );
};

export default LandingPage;
