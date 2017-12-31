/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

function createMarkup(summary) {
  return { __html: summary };
}

const HtmlSummary = ({ summary, className }) => (
  <div
    className={className}
    dangerouslySetInnerHTML={summary !== null ? createMarkup(summary) : null}
  />
);

HtmlSummary.defaultProps = {
  className: null,
  summary: null,
};
HtmlSummary.propTypes = {
  summary: PropTypes.string,
  className: PropTypes.string,
};

export default HtmlSummary;
