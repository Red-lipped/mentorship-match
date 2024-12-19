import React, {Component} from 'react';
// import SignupLogin from "../component/SignupLogin"
import LandingPage from "../component/LandingPage"
import ProfileDashboard from "../component/ProfileDashboard"
import UsersPage from "../component/UsersPage"

const App = () => {

    return(
        <div>
        {/* <SignupLogin /> */}
        <LandingPage />
        <ProfileDashboard />
        <UsersPage />
        <p className='hi'>HI!</p>
        </div>
    );
}

export default App;