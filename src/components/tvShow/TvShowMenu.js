import React from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const TVShowMenu = ({ match }) => (
  <Nav className="nav-pills" id="tv-show-menu">
    <NavItem>
      <NavLink tag={Link} to={`${match.url}`}>
        Show
      </NavLink>
      <NavLink tag={Link} to={`${match.url}/seasons`}>
        Episodes
      </NavLink>
    </NavItem>
  </Nav>
);

TVShowMenu.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default TVShowMenu;
