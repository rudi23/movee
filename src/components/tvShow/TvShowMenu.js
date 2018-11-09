import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import { LinkContainer } from 'react-router-bootstrap';

const TVShowMenu = ({ match }) => (
  <Nav className="nav-pills" id="tv-show-menu">
    <LinkContainer exact to={`${match.url}`}>
      <NavItem eventKey={1}>Show</NavItem>
    </LinkContainer>
    <LinkContainer to={`${match.url}/seasons`}>
      <NavItem eventKey={2}>Episodes</NavItem>
    </LinkContainer>
  </Nav>
);

TVShowMenu.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default TVShowMenu;
