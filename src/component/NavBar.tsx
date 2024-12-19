import React from 'react';
import Logo from "../../public/assets/Logo.png";

function NavBar() {
    return (
    <nav className='nav'>
        <a href='#' className='logo'><img src={Logo}/></a>
        <a href='#' className='nav-links'>Dashboard</a>
        <a href='#' className='nav-links'>Forum</a>
    </nav>
    );
}

export default NavBar;