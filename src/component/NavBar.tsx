// We are able to import the Logo static image and refer to it in the header
import Logo from "../../public/assets/Logo.png";

function NavBar() {
    return (
        <header className='header'>
        <a href='#' className='logo'><img src={Logo}/></a>
    <nav className='nav'>
        <a href='#' className='nav-links'>Dashboard</a>
        <a href='#' className='nav-links'>Forum</a>
    </nav>
    </header>
    );
}

export default NavBar;