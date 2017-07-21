import React from 'react';
import PropTypes from 'prop-types';

function createMarkup(summary) {
  return { __html: summary };
}

const TVShowEpisodeListItem = props => (
  <div className="episode">
    <h3>{props.show.title}: {props.title}</h3>
    <h4>{props.airTime}</h4>
    <div dangerouslySetInnerHTML={props.summary !== null ? createMarkup(props.summary) : null} />
  </div>
);

TVShowEpisodeListItem.propTypes = {
  title: PropTypes.string.isRequired,
  airTime: PropTypes.string.isRequired,
  show: PropTypes.object.isRequired,
  summary: PropTypes.string,
};

export default TVShowEpisodeListItem;
