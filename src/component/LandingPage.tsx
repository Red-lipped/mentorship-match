import React, { JSX, useEffect, useState } from 'react';
import Logo from '../../public/assets/Logo.png';
// import Image from '../../public/assets/sigmund-unsplash.jpg';

const LandingPage = (): JSX.Element => {
  return (
    <div className='landing'>
      <header className='landing-header'>
        <img
          src={Logo}
          alt='Mentorship Match Logo'
          className='landing-logo'
        />
        <h1>Welcome to Mentorship-Match</h1>
      </header>

      <ul className='landing-links'>
        <li>
          <h3>Join our mentee list</h3>
          {/* <img src={Image} alt="Join our mentee list" className="link-img" /> */}
        </li>
        <li>
          <h3>Check out our newest Mentors</h3>
          {/* <img src={Image} alt="Check out our newest Mentors" className="link-img" /> */}
        </li>
        <li>
          <h3>Hear success stories</h3>
          {/* <img src={Image} alt="Hear success stories" className="link-img" /> */}
        </li>
        <li>
          <h3>Watch growth and inspirational videos</h3>
          {/* <img src={Image} alt="Watch growth and inspirational videos" className="link-img" /> */}
        </li>
      </ul>

      <h1>Lorem ipsum dolor sit amet</h1>
    </div>
  );
};

export default LandingPage;
