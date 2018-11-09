import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default ChildComponent => {
  const RequireAuth = props => {
    switch (props.auth.isLogged) {
      case false:
        return <Redirect to="/" />;
      default:
        return <ChildComponent {...props} />;
    }
  };

  RequireAuth.propTypes = {
    auth: PropTypes.shape({
      isLogged: PropTypes.bool,
      data: PropTypes.object,
    }).isRequired,
  };

  function mapStateToProps({ auth }) {
    return { auth };
  }

  return connect(mapStateToProps)(RequireAuth);
};
