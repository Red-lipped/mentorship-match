import { set } from 'mongoose';
import React, {useState, useEffect} from 'react';
// import SignupLogin from "../component/SignupLogin"
// import LandingPage from "../component/LandingPage"
// import Dashboard from "../component/Dashboard"
// import Forum from "../component/Forum"

const App = () => {
const [view, setView] = useState('home')

useEffect(() => {
    alert('Sign up to be a Mentor/Mentee!');
  }, []); 

    return(
        <div>
         <h1>Mentorship-Match Directory</h1>  
         <nav className='navBar'>
        <a href='SignupLogin' onClick={() => setView('SignupLogin')} className='nav-links'> SignupLogin</a>
        <a href='LandingPage' onClick={()=>setView('LandingPage')}  className='nav-links'>Landing Page</a>
        <a href='Dashboard' onClick={()=> setView('Dashboard')} className='nav-links'>Dashboard</a>
        <a href='Forum' onClick={()=> setView('Forum')} className='nav-links' > Forum</a>
         </nav>
         
         {view === 'SignupLogin' && <SignupLogin />}
         {view === 'LandingPage' && <LandingPage />}
         {view === 'Dashboard' && <Dashboard />}
         {view === 'Forum' && <Forum />}
        </div>
    );
}

export default App;