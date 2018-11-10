import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { isOpen } = this.state;
    const { auth } = this.props;
    const authButton = auth.isLogged ? (
      <NavLink href="/api/logout">Logout</NavLink>
    ) : (
      <NavLink href="/api/auth/google">Login</NavLink>
    );

    return (
      <Navbar color="dark" dark expand="md" fixed="top">
        <NavbarBrand href="/">Movee</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/search">
                Search
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/favourites">
                Favourites
              </NavLink>
            </NavItem>
            <NavItem>{authButton}</NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

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
