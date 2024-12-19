import React, {Component} from 'react';
import SignupLogin from "../component/SignupLogin"
import LandingPage from "../component/LandingPage"
import Dashboard from "../component/Dashboard"
import UsersPage from "../component/UsersPage"

const App = () => {

    return(
        <div>
        <SignupForm />
        <LandingPage />
        <Dashboard />
        <UsersPage />
        <p className='hi'>HI!</p>
        </div>
    );
}

export default App;