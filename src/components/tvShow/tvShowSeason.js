import React from 'react';
import PropTypes from 'prop-types';
import TVShowEpisodes from './tvShowEpisodes';

const TVShowSeason = ({ season }) => (
  <div className="tv-show-season">
    <h2>Season {season.number}: {season.name}</h2>
    <h3>{season.premiereDate} - {season.endDate}</h3>
    <TVShowEpisodes episodes={season.episodes} />
  </div>
);

TVShowSeason.propTypes = {
  season: PropTypes.object.isRequired,
};

export default TVShowSeason;
