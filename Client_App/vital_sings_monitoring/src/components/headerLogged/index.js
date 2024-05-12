import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Image from 'react-bootstrap/Image';
import logo from '../../assets/logo.png';
import '../../styles/headerLogged.css';

function HeaderLogged(){
    return(
        <>
            <div className="headerLoggedPrincipal">
                <Navbar key='false' expand='false' className="header">
                          <Container fluid>
                          <Navbar.Brand href="#home">
                            <Image src={logo}/>
                            <span>Monitor your health with us</span>
                        </Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-false`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-false`}
                  placement="start"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                      Health Monitor
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Nav.Link href="#action1">Home</Nav.Link>
                      <Nav.Link href="#action2">Link</Nav.Link>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
                          </Container>
                        </Navbar>
            </div>
        </>
    )
}

export default HeaderLogged;