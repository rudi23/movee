import React from 'react';
import PropTypes from 'prop-types';
import TVShowEpisodesList from './tvShowEpisodeList';

const ChannelListItem = props => (
  <div className="channel">
    <h2>{props.name}</h2>
    <p>{props.country.name}</p>
    <TVShowEpisodesList
      episodes={props.episodes}
      favourites={props.favourites}
      toggleFavourite={props.toggleFavourite}
    />
  </div>
);

ChannelListItem.propTypes = {
  name: PropTypes.string.isRequired,
  country: PropTypes.object.isRequired,
  episodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  favourites: PropTypes.arrayOf(PropTypes.number).isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

export default ChannelListItem;
