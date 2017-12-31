import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavbarToggle from 'react-bootstrap/lib/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/lib/NavbarCollapse';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const Menu = ({ auth = null }) => {
  const authButton = auth.isLogged ? (
    <NavItem eventKey={4} href="/api/logout">Logout</NavItem>
  ) : (
    <NavItem eventKey={4} href="/api/auth/google">Login</NavItem>
  );

  return (
    <Navbar inverse fixedTop>
      <div className="container">
        <Navbar.Header>
          <NavbarToggle className="collapsed" />
          <Navbar.Brand>
            <Link href="/" to="/">Movee</Link>
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
            <LinkContainer to="/favourites">
              <NavItem eventKey={3}>Favourites</NavItem>
            </LinkContainer>
            {authButton}
          </Nav>
        </NavbarCollapse>
      </div>
    </Navbar>
  );
};

Menu.propTypes = {
  auth: PropTypes.shape({
    isLogged: PropTypes.bool,
    data: PropTypes.object,
  }).isRequired,
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Menu);
