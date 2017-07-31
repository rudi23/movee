/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

function createMarkup(summary) {
  return { __html: summary };
}

const TVShowEpisode = ({ episode }) => (
  <div className="tv-show-episode">
    <div className="tv-show-episode__main">
      <div className="tv-show-episode__cover">
        <img src={episode.image} alt={episode.name} />
      </div>
      <div className="tv-show-episode__info">
        <p>Episode {episode.number}: {episode.name}</p>
      </div>
      <div className="tv-show-episode__summary" dangerouslySetInnerHTML={episode.summary !== null ? createMarkup(episode.summary) : null} />
    </div>
  </div>
);

TVShowEpisode.propTypes = {
  episode: PropTypes.object.isRequired,
};

export default TVShowEpisode;
