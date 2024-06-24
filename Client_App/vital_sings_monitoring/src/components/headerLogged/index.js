import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Image from 'react-bootstrap/Image';
import logo from '../../assets/logo.png';
import logout from '../../assets/images/logout.png';
import '../../styles/headerLogged.css';
import PatientsService from '../../services/patient';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import socket from '../socket/socket';

function HeaderLogged() {
  const [navigateToHome, setNavigateToHome] = useState(false);
  socket.on('dados', (message) => {
    console.log(message);
  })
  const logOut = async () => {
    await PatientsService.logout();
    setNavigateToHome(true);
  }

  if(navigateToHome) return <Navigate replace to={{pathname: '/'}}/>

  return (
    <>
      <div className="headerLoggedPrincipal">
        <Navbar key='false' expand='false' className="header">
          <Container fluid>
            <Navbar.Brand href="#home">
              <Image src={logo} />
              <span className='headerLoggedTitle'>Monitor your health with us</span>
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
              <Offcanvas.Body className='sideNav'>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Home</Nav.Link>
                  <Nav.Link href="#action2">Pacientes</Nav.Link>
                  <Nav.Link href="#action2">Gerir Pacientes</Nav.Link>
                  <Nav.Link href="#action2">Gerir Doutores</Nav.Link>
                  <Nav.Link href="#action2">Notificações</Nav.Link>
                  <Nav.Link href="#action2">Sobre o sistema</Nav.Link>
                </Nav>
                <div className='logout'><button className='logoutButton' type='button' onClick={logOut}>
                  <Image className='logoutImage' src={logout}/>
                </button></div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>
    </>
  )
}

export default HeaderLogged;