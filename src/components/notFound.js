import React from 'react';
import PropTypes from 'prop-types';

const NotFound = ({ staticContext = {} }) => {
  // eslint-disable-next-line no-param-reassign
  staticContext.notFound = true;

  return (
    <div className="container">
      <h1>404</h1>
      <h2>Page not Found</h2>
    </div>
  );
};

NotFound.defaultProps = {
  staticContext: {},
};

NotFound.propTypes = {
  staticContext: PropTypes.object,
};

export default {
  component: NotFound,
};
