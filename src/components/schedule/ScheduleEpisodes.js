import React from 'react';
import PropTypes from 'prop-types';
import ScheduleEpisode from './ScheduleEpisode';

const ScheduleEpisodes = ({ episodes, favourites, toggleFavourite }) => (
  <div className="episodes">
    {episodes.map(episode => (
      <ScheduleEpisode
        isFavourite={favourites.has(episode.show.id)}
        key={episode.id}
        toggleFavourite={toggleFavourite}
        {...episode}
      />
    ))}
  </div>
);

ScheduleEpisodes.propTypes = {
  episodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  favourites: PropTypes.object.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

export default ScheduleEpisodes;
