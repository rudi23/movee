import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function createMarkup(summary) {
  return { __html: summary };
}

const TVShowEpisodeListItem = ({ show, summary, title, airTime }) => (
  <div className="episode">
    <h3><Link to={`/show/${show.id}`}>{show.title}</Link>: {title}</h3>
    <h4>{airTime}</h4>
    <div dangerouslySetInnerHTML={summary !== null ? createMarkup(summary) : null} />
  </div>
);

TVShowEpisodeListItem.propTypes = {
  title: PropTypes.string.isRequired,
  airTime: PropTypes.string.isRequired,
  show: PropTypes.object.isRequired,
  summary: PropTypes.string,
};

export default TVShowEpisodeListItem;
