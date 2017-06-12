import React from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavbarToggle from 'react-bootstrap/lib/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/lib/NavbarCollapse';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const Menu = () => (
  <Navbar inverse fixedTop>
    <div className="container">
      <Navbar.Header>
        <NavbarToggle collapsed />
        <Navbar.Brand>
          <Link to="/">Movee</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <NavbarCollapse>
        <Nav>
          <LinkContainer to="/" exact>
            <NavItem eventKey={1}>Home</NavItem>
          </LinkContainer>
          <LinkContainer to="/search">
            <NavItem eventKey={2}>Search</NavItem>
          </LinkContainer>
        </Nav>
      </NavbarCollapse>
    </div>
  </Navbar>
);

export default Menu;
