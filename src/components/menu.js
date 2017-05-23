import React from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavbarToggle from 'react-bootstrap/lib/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/lib/NavbarCollapse';

const Menu = (props) => (
    <Navbar inverse fixedTop>
        <div className="container">
            <Navbar.Header>
                <NavbarToggle collapsed />
                <Navbar.Brand>
                    <a href="#">Movee</a>
                </Navbar.Brand>
            </Navbar.Header>
            <NavbarCollapse>
                <Nav>
                    <NavItem eventKey={1} href="#">Home</NavItem>
                </Nav>
            </NavbarCollapse>
        </div>
    </Navbar>
);

export default Menu;
