import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import '../styles/Header.less';

const Header = () => {
    return(
        <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">Vasco-Da-Gama</Navbar.Brand>
        <Nav className="page-links">
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
      </Navbar>
    )
}

export default Header