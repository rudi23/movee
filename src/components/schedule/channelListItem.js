import React from 'react';
import PropTypes from 'prop-types';
import TVShowEpisodesList from './tvShowEpisodeList';

const ChannelListItem = ({ name, country, episodes }) => (
  <div className="channel">
    <h2>{name}</h2>
    <p>{country.name}</p>
    <TVShowEpisodesList episodes={episodes} />
  </div>
);

ChannelListItem.propTypes = {
  name: PropTypes.string.isRequired,
  country: PropTypes.object.isRequired,
  episodes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ChannelListItem;
