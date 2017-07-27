import React from 'react';
import PropTypes from 'prop-types';
import TVShowEpisodeListItem from './tvShowEpisodeListItem';

const TVShowEpisodeList = ({ episodes, favourites, toggleFavourite }) => (
  <div className="episodes">
    {episodes.map(episode =>
      <TVShowEpisodeListItem
        key={episode.id}
        isFavourite={favourites.includes(episode.show.id)}
        toggleFavourite={toggleFavourite}
        {...episode}
      />
    )}
  </div>
);

TVShowEpisodeList.propTypes = {
  episodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  favourites: PropTypes.arrayOf(PropTypes.number).isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

export default TVShowEpisodeList;
