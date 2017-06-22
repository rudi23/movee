import React from 'react';
import PropTypes from 'prop-types';

function createMarkup(summary) {
  return { __html: summary };
}

const TVShowEpisodeListItem = props => (
  <div className="episode">
    <h3>{props.show.title}: {props.title}</h3>
    <h4>{props.airTime}</h4>
    <div dangerouslySetInnerHTML={createMarkup(props.summary)} />
  </div>
);

TVShowEpisodeListItem.propTypes = {
  title: PropTypes.string.isRequired,
  airTime: PropTypes.string.isRequired,
  show: PropTypes.shape().isRequired,
  summary: PropTypes.string.isRequired,
};

export default TVShowEpisodeListItem;
