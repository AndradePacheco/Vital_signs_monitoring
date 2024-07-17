import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../styles/header.css';
import logo from '../../assets/logo.png';
import login from '../../assets/images/login.png';
import register from '../../assets/images/register.png';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <Navbar expand="lg" className="header">
                <Container>
                    <Navbar.Brand href="#home">
                        <Image src={logo}/>
                        <span>Health Monitor</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home"><span className='spanLink'>Home</span></Nav.Link>
                            <Nav.Link href="#link"><span className='spanLink'>Sobre</span></Nav.Link>
                            <NavDropdown title="Junte-se" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">
                                    <Link to="/login">
                                        <span className='header-login'>
                                            <Image className='header-icon' src={login}/>
                                        </span>
                                        <span>Entrar</span>
                                    </Link>
                                    </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                <Link to="/doctorRegister">
                                    <span className='header-register'>
                                            <Image className='header-icon' src={register} />
                                    </span>
                                    <span>Register</span>
                                </Link>
                                </NavDropdown.Item>
                                {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
    </NavDropdown.Item>*/}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;