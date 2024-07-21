import { Navbar, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'; 

const NavBar = () => {

    const location = useLocation(); // Get the current location

    // Paths where links should be hidden
    const hiddenPaths = ['/login', '/register'];

    return (
        <div id='navbar-wrapper'>
            <Navbar variant='dark' expand='lg'>
                <Navbar.Brand href='/'>Google Books Search</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto'>
                        {!hiddenPaths.includes(location.pathname) && (
                            <>
                                <Nav.Link href='/'>HOME</Nav.Link>
                                <Nav.Link href='/my-shelves'>MY SHELVES</Nav.Link>
                                <Nav.Link href='/login'>LOG OUT</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default NavBar;
