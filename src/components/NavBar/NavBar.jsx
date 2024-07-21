import { Navbar, Nav } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const hiddenPaths = ['/login', '/register'];
    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username'); 

    const handleLogout = () => {
        sessionStorage.removeItem('token'); // Remove token on logout
        sessionStorage.removeItem('username'); // Remove username on logout
        navigate('/login'); // Redirect to login page
    };

    return (
        <div id='navbar-wrapper'>
            <Navbar variant='dark' expand='lg'>
                <Navbar.Brand href='/'>
                    {token ? `Hello, ${username}` : 'Google Book Search'}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto'>
                        {!hiddenPaths.includes(location.pathname) && (
                            token ? (
                                <>
                                    <Nav.Link href='/'>HOME</Nav.Link>
                                    <Nav.Link href='/my-shelves'>MY SHELVES</Nav.Link>
                                    <Nav.Link onClick={handleLogout}>LOG OUT</Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link href='/login'>LOG IN</Nav.Link>
                                    <Nav.Link href='/register'>REGISTER</Nav.Link>
                                </>
                            )
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default NavBar;
