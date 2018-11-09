import React from 'react';
import PropTypes from 'prop-types';
import TVShowEpisode from './TvShowEpisode';

const TVShowEpisodes = ({ episodes }) => (
  <div className="tv-show-episodes">
    {episodes.map(episode => (
      <TVShowEpisode episode={episode} key={episode.id} />
    ))}
  </div>
);

TVShowEpisodes.defaultProps = {
  episodes: [],
};

TVShowEpisodes.propTypes = {
  episodes: PropTypes.array,
};

export default TVShowEpisodes;
