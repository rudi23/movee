/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import HtmlSummary from '../ui/HtmlSummary';

const TVShowEpisode = ({ episode }) => (
  <div className="tv-show-episode">
    <div className="tv-show-episode__cover">
      <img src={episode.image} alt={episode.name} />
    </div>
    <div className="episode-info">
      <h4 className="episode-info__title">Episode {episode.number}: {episode.name}</h4>
      <p className="episode-info__item">{episode.runtime} min.</p>
    </div>
    <HtmlSummary className="tv-show-episode__summary" summary={episode.summary} />
  </div>
);

TVShowEpisode.propTypes = {
  episode: PropTypes.object.isRequired,
};

export default TVShowEpisode;
