import React from 'react';
import PropTypes from 'prop-types';

const loader = (
  <div className="loader">
    Loading
    <span className="loader__dot">.</span>
    <span className="loader__dot">.</span>
    <span className="loader__dot">.</span>
  </div>
);

const Spinner = ({ visible }) => (visible ? loader : null);

Spinner.propTypes = {
  visible: PropTypes.bool,
};

export default Spinner;
